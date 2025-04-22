// src/stores/reviewStore.js
import { defineStore } from 'pinia'
import { reviewService } from '../services/reviewService'

export const useReviewStore = defineStore('review', {
  state: () => ({
    reviews: [],
    currentReview: null,
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    totalElements: 0,
    campsite: { id: 1, name: '苗栗區 山之間' } // 預設營地
  }),
  
  getters: {
    getReviewById: (state) => (id) => {
      return state.reviews.find(review => review.id === id)
    },
    
    averageRating: (state) => {
      if (state.reviews.length === 0) return 0
      const sum = state.reviews.reduce((acc, review) => acc + review.overallRating, 0)
      return (sum / state.reviews.length).toFixed(1)
    },
    
    averageCleanlinessRating: (state) => {
      if (state.reviews.length === 0) return 0
      const sum = state.reviews.reduce((acc, review) => acc + review.cleanlinessRating, 0)
      return (sum / state.reviews.length).toFixed(1)
    },
    
    averageConvenienceRating: (state) => {
      if (state.reviews.length === 0) return 0
      const sum = state.reviews.reduce((acc, review) => acc + review.convenienceRating, 0)
      return (sum / state.reviews.length).toFixed(1)
    },
    
    averageFriendlinessRating: (state) => {
      if (state.reviews.length === 0) return 0
      const sum = state.reviews.reduce((acc, review) => acc + review.friendlinessRating, 0)
      return (sum / state.reviews.length).toFixed(1)
    }
  },
  
  actions: {
    async fetchReviews(campSiteId = null, page = 1, size = 10) {
      this.loading = true
      try {
        // In development, we'll use mock data until the API is ready
        // Later you can uncomment this to use the actual API
        // const response = await reviewService.getReviews(campSiteId || this.campsite.id, page, size)
        
        // Mock data for development
        const mockData = {
          content: [
            {
              id: 1,
              userId: 101,
              userName: '王小明',
              campSiteId: 1,
              reviewText: '本營地設計很好，布局新穎的位置，夜晚安靜和幽靜，基本設施很不錯，人員服務親切專業，有濃密樹蔭遮陽，中午陽光也不會太強烈，整體滿意。',
              overallRating: 5,
              cleanlinessRating: 4,
              convenienceRating: 5,
              friendlinessRating: 5,
              pros: '環境優美，設施完善',
              cons: '週末人較多',
              createdAt: '2024年4月2日',
              likeCount: 12,
              userLikeStatus: 0
            },
            {
              id: 2,
              userId: 102,
              userName: '李小華',
              campSiteId: 1,
              reviewText: '營地環境優美，非常適合家庭出遊。衛生間乾淨，營位寬敞。夜晚可以看到滿天星斗，是個放鬆心情的好地方。',
              overallRating: 4,
              cleanlinessRating: 4,
              convenienceRating: 3,
              friendlinessRating: 5,
              pros: '夜晚星空美麗，環境安靜',
              cons: '位置較偏遠，交通不便',
              createdAt: '2024年3月15日',
              likeCount: 8,
              userLikeStatus: 1
            }
          ],
          totalPages: 1,
          number: page - 1,
          totalElements: 2
        }
        
        this.reviews = mockData.content
        this.totalPages = mockData.totalPages
        this.currentPage = mockData.number + 1
        this.totalElements = mockData.totalElements
        this.error = null
      } catch (error) {
        console.error('獲取評價失敗:', error)
        this.error = '獲取評價失敗，請稍後再試'
      } finally {
        this.loading = false
      }
    },
    
    async fetchReviewById(id) {
      this.loading = true
      try {
        // In development, we'll use mock data
        // const data = await reviewService.getReviewById(id)
        
        // Mock data
        const data = this.reviews.find(r => r.id === id) || {
          id: id,
          userId: 101,
          userName: '王小明',
          campSiteId: 1,
          reviewText: '這是一個很詳細的評價內容...',
          overallRating: 5,
          cleanlinessRating: 4,
          convenienceRating: 5,
          friendlinessRating: 5,
          pros: '環境優美，設施完善',
          cons: '週末人較多',
          createdAt: '2024年4月2日',
          imageUrls: [
            'https://via.placeholder.com/400x300?text=營地照片1',
            'https://via.placeholder.com/400x300?text=營地照片2'
          ],
          likeCount: 12,
          userLikeStatus: 0
        }
        
        this.currentReview = data
        this.error = null
        return data
      } catch (error) {
        console.error('獲取評價詳情失敗:', error)
        this.error = '獲取評價詳情失敗，請稍後再試'
        return null
      } finally {
        this.loading = false
      }
    },
    
    async createReview(reviewData) {
      this.loading = true
      try {
        // const data = await reviewService.createReview({...reviewData})
        
        // Mock response
        const newReview = {
          ...reviewData,
          id: this.reviews.length + 1,
          userName: '當前用戶',
          createdAt: new Date().toISOString(),
          likeCount: 0,
          userLikeStatus: 0
        }
        
        this.reviews.unshift(newReview)
        this.totalElements += 1
        this.error = null
        return newReview
      } catch (error) {
        console.error('創建評價失敗:', error)
        this.error = '創建評價失敗，請稍後再試'
        return null
      } finally {
        this.loading = false
      }
    },
    
    async updateReview(id, reviewData) {
      this.loading = true
      try {
        // const data = await reviewService.updateReview(id, reviewData)
        
        // Mock update
        const index = this.reviews.findIndex(r => r.id === id)
        if (index !== -1) {
          const updatedReview = {
            ...this.reviews[index],
            ...reviewData,
            updatedAt: new Date().toISOString()
          }
          this.reviews[index] = updatedReview
          
          if (this.currentReview && this.currentReview.id === id) {
            this.currentReview = updatedReview
          }
          
          return updatedReview
        }
        
        this.error = null
        return null
      } catch (error) {
        console.error('更新評價失敗:', error)
        this.error = '更新評價失敗，請稍後再試'
        return null
      } finally {
        this.loading = false
      }
    },
    
    async deleteReview(id, userId) {
      this.loading = true
      try {
        // await reviewService.deleteReview(id, userId)
        
        // Mock delete
        this.reviews = this.reviews.filter(r => r.id !== id)
        this.totalElements -= 1
        
        if (this.currentReview && this.currentReview.id === id) {
          this.currentReview = null
        }
        
        this.error = null
        return true
      } catch (error) {
        console.error('刪除評價失敗:', error)
        this.error = '刪除評價失敗，請稍後再試'
        return false
      } finally {
        this.loading = false
      }
    },
    
    async toggleLike(reviewId, userId) {
      try {
        // await reviewService.toggleLike(reviewId, userId)
        
        // Mock toggle like
        const index = this.reviews.findIndex(r => r.id === reviewId)
        if (index !== -1) {
          const review = this.reviews[index]
          const newStatus = review.userLikeStatus === 1 ? 0 : 1
          const likeDelta = newStatus === 1 ? 1 : -1
          
          this.reviews[index] = {
            ...review,
            userLikeStatus: newStatus,
            likeCount: review.likeCount + likeDelta
          }
        }
        
        if (this.currentReview && this.currentReview.id === reviewId) {
          const newStatus = this.currentReview.userLikeStatus === 1 ? 0 : 1
          const likeDelta = newStatus === 1 ? 1 : -1
          
          this.currentReview = {
            ...this.currentReview,
            userLikeStatus: newStatus,
            likeCount: this.currentReview.likeCount + likeDelta
          }
        }
        
        return true
      } catch (error) {
        console.error('點讚失敗:', error)
        return false
      }
    },
    
    async searchReviews(params) {
      this.loading = true
      try {
        // const response = await reviewService.searchReviews(params)
        
        // Mock search results
        // In a real app, you would filter based on params
        const mockSearchResults = {
          content: this.reviews.filter(review => {
            // Simple keyword filter
            if (params.keyword && !review.reviewText.includes(params.keyword)) {
              return false
            }
            
            // Rating filter
            if (params.minRating && review.overallRating < params.minRating) {
              return false
            }
            
            return true
          }),
          totalPages: 1,
          number: 0,
          totalElements: 2
        }
        
        this.reviews = mockSearchResults.content
        this.totalPages = mockSearchResults.totalPages
        this.currentPage = mockSearchResults.number + 1
        this.totalElements = mockSearchResults.totalElements
        this.error = null
      } catch (error) {
        console.error('搜尋評價失敗:', error)
        this.error = '搜尋評價失敗，請稍後再試'
      } finally {
        this.loading = false
      }
    }
  },
  
  // 啟用持久化
  persist: {
    storage: localStorage,
    paths: ['currentPage', 'campsite'] // 只持久化特定狀態
  }
})