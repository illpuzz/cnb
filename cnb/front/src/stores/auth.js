// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // 模擬用戶數據 - 實際開發時應從 API 獲取
    user: {
      id: 101,
      name: '王小明',
      email: 'user@example.com',
      avatar: null,
      role: 'user' // 'user' 或 'admin'
    },
    isAuthenticated: true, // 默認已登入狀態，方便開發測試
    error: null
  }),
  
  getters: {
    currentUser: (state) => state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    userId: (state) => state.user?.id
  },
  
  actions: {
    /**
     * 登入 (模擬)
     * @param {Object} credentials - 登入憑證 (email, password)
     */
    async login(credentials) {
      try {
        // 模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 模擬登入成功
        if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
          this.user = {
            id: 100,
            name: '管理員',
            email: 'admin@example.com',
            avatar: null,
            role: 'admin'
          };
          this.isAuthenticated = true;
          this.error = null;
        } else if (credentials.email === 'user@example.com' && credentials.password === 'user123') {
          this.user = {
            id: 101,
            name: '王小明',
            email: 'user@example.com',
            avatar: null,
            role: 'user'
          };
          this.isAuthenticated = true;
          this.error = null;
        } else {
          throw new Error('帳號或密碼錯誤');
        }
        
        return this.user;
      } catch (error) {
        this.error = error.message || '登入失敗';
        this.isAuthenticated = false;
        this.user = null;
        throw error;
      }
    },
    
    /**
     * 登出
     */
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.error = null;
    },
    
    /**
     * 註冊 (模擬)
     * @param {Object} userData - 用戶資料
     */
    async register(userData) {
      try {
        // 模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模擬註冊成功
        this.user = {
          id: 102, // 模擬新 ID
          name: userData.name,
          email: userData.email,
          avatar: null,
          role: 'user'
        };
        
        this.isAuthenticated = true;
        this.error = null;
        
        return this.user;
      } catch (error) {
        this.error = error.message || '註冊失敗';
        throw error;
      }
    },
    
    /**
     * 檢查是否有權限執行操作
     * @param {number} resourceUserId - 資源的所有者 ID
     * @returns {boolean} - 是否有權限
     */
    hasPermission(resourceUserId) {
      // 管理員有所有權限
      if (this.isAdmin) {
        return true;
      }
      
      // 普通用戶只能操作自己的資源
      return this.userId === resourceUserId;
    }
  },
  
  // 啟用持久化
  persist: {
    storage: localStorage
  }
});