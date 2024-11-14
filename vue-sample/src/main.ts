import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Workbox } from 'workbox-window'

/**
 * キャッシュストレージの永続化をリクエストする
 * @returns {Promise<boolean>} 永続化が成功したかどうか
 */
const requestPersistentStorage = async (): Promise<boolean> => {
  if (navigator.storage && navigator.storage.persist) {
    return navigator.storage.persist()
  }
  return false
}

// ページのロード時に Service Worker の更新をチェックする
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const wb = new Workbox('/service-worker.js')
    await wb.register({ immediate: true })
  })
}

// キャッシュストレージの永続化リクエストを行う
requestPersistentStorage().then((result) => {
  if (!result) {
    console.warn('Failed to request persistent storage.')
  } else {
    console.log('Successfully requested persistent storage.')
  }
})

const app = createApp(App)

app.use(router)

app.mount('#app')
