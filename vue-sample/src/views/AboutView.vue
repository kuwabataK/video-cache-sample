<template>
  <div class="about">
    <video controls type="video/mp4" src="/sample-video.mp4"></video>
    <button @click="loadVideo">Load Video</button>
    <button @click="cacheVideo">Cache Video</button>
    <button @click="deleteVideo">Delete Video</button>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

const videoURL = '/sample-video.mp4'

const videoObjectURL = ref('')

const cacheVideo = async () => {
  // キャッシュストレージの名前を指定してキャッシュインスタンスを生成
  const cache = await caches.open('video-cache')
  // キャッシュストレージにリソースを追加
  return cache.add(videoURL)
}

const loadVideo = async () => {
  // キャッシュストレージの名前を指定してキャッシュインスタンスを生成
  const cache = await caches.open('video-cache')
  // キャッシュストレージからリソースを取得
  const response = await cache.match(videoURL)
  if (response) {
    // キャッシュが合った場合は、そのレスポンスをblobにしてvideo要素のsrcに設定
    const blob = await response.blob()
    videoObjectURL.value = URL.createObjectURL(blob)
  }
}

const deleteVideo = async () => {
  // キャッシュストレージの名前を指定してキャッシュインスタンスを生成
  const cache = await caches.open('video-cache')
  // キャッシュストレージからリソースを削除
  return cache.delete(videoURL)
}

onUnmounted(() => {
  // loadVideoで生成したObjectURLを解放
  URL.revokeObjectURL(videoObjectURL.value)
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
