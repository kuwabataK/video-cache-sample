<template>
  <div class="about">
    <video controls type="video/mp4">
    </video>
    <button @click="loadVideo">Load Video</button>
    <button @click="cacheVideo">Cache Video</button>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'

const videoURL = '/sample-video.mp4'

const cacheVideo = async () => {
  const cache = await caches.open('video-cache')
  return cache.add(videoURL)
}

const loadVideo = async () => {
  const cache = await caches.open('video-cache')
  const response = await cache.match(videoURL)
  if (response) {
    const blob = await response.blob()
    const video = document.querySelector('video')
    if (video) {
      video.src = URL.createObjectURL(blob)
      video.controls = true
    }
  }
}

onUnmounted(() => {
  const video = document.querySelector('video')
  if (video) {
    video.pause()
    video.remove()
    URL.revokeObjectURL(video.src)
  }
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
