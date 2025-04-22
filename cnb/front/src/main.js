// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
// Add these imports to your main.js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 引入 Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// 引入 Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// 引入自訂樣式
import './assets/styles/variables.css'
import './assets/styles/global.css'

// 引入 Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 定義開發環境
window.process = { env: { NODE_ENV: 'development' } }

// 創建 Pinia 實例並使用持久化插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 創建 Vue 應用
const app = createApp(App)

// 使用路由和狀態管理
app.use(router)
app.use(pinia)

// 全局錯誤處理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue 錯誤:', err)
  console.error('組件:', vm)
  console.error('錯誤信息:', info)
}

// 掛載應用
app.mount('#app')