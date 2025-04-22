// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

// 引入 Bootstrap CSS 和 JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 引入 Bootstrap Icons (需要先安裝: npm install bootstrap-icons)
// import 'bootstrap-icons/font/bootstrap-icons.css'

// 引入自訂樣式
import './assets/styles/variables.css'
import './assets/styles/global.css'

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