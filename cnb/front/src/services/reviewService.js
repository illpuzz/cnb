// src/services/reviewService.js
import axios from 'axios'

// API 基本路徑 - 實際部署時修改為真實後端 URL
const API_URL = 'http://localhost:8080/api'

// 模擬數據
const mockReviews = [
  {
    id: 1,
    userId: 101,
    userName: '王小明',
    campSiteId: 1,
    campSiteName: '苗栗區 山之間',
    reviewText: '本次營地體驗非常好，設施齊全且乾淨，管理人員親切友善。夜晚可以看到滿天星星，非常推薦喜歡大自然的朋友來此露營！',
    overallRating: 5,
    cleanlinessRating: 5,
    convenienceRating: 4,
    friendlinessRating: 5,
    pros: '環境優美，設施齊全，管理員友善',
    cons: '夏天蚊蟲較多',
    imageUrls: [
      'https://via.placeholder.com/400x300?text=營地照片1',
      'https://via.placeholder.com/400x300?text=營地照片2'
    ],
    likeCount: 15,
    userLikeStatus: 0,
    createdAt: '2024年4月2日',
    updatedAt: '2024年4月2日'
  },
  {
    id: 2,
    userId: 102,
    userName: '李小華',
    campSiteId: 1,
    campSiteName: '苗栗區 山之間',
    reviewText: '營地環境優美，非常適合家庭出遊。衛生間乾淨，營位寬敞。夜晚可以看到滿天星斗，是個放鬆心情的好地方。',
    overallRating: 4,
    cleanlinessRating: 4,
    convenienceRating: 3,
    friendlinessRating: 5,
    pros: '空氣清新，視野開闊',
    cons: '洗澡熱水不太穩定',
    imageUrls: [
      'https://via.placeholder.com/400x300?text=營地照片3'
    ],
    likeCount: 8,
    userLikeStatus: 0,
    createdAt: '2024年3月15日',
    updatedAt: '2024年3月15日'
  },
  {
    id: 3,
    userId: 103,
    userName: '張大華',
    campSiteId: 1,
    campSiteName: '苗栗區 山之間',
    reviewText: '這次住宿體驗非常好，工作人員熱情有禮，營地設施完善，營位規劃得當。特別喜歡他們的戶外活動安排，孩子們很喜歡。',
    overallRating: 5,
    cleanlinessRating: 4,
    convenienceRating: 5,
    friendlinessRating: 5,
    pros: '活動豐富，適合親子同樂',
    cons: '價格稍高',
    imageUrls: [
      'https://via.placeholder.com/400x300?text=營地照片4',
      'https://via.placeholder.com/400x300?text=營地照片5',
      'https://via.placeholder.com/400x300?text=營地照片6'
    ],
    likeCount: 12,
    userLikeStatus: 1,
    createdAt: '2024年4月1日',
    updatedAt: '2024年4月1日',
    replyText: '感謝您的評價！我們一直努力提供最好的服務和體驗。關於價格部分，我們提供不同等級的營位選擇，歡迎下次選擇更符合預算的方案。期待您再次光臨！'
  }
];

// 模擬 API 響應
const mockResponse = (data, delay = 500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// 創建模擬分頁響應
const createPageResponse = (items, page, size) => {
  const totalElements = items.length;
  const totalPages = Math.ceil(totalElements / size);
  const start = page * size;
  const end = Math.min(start + size, totalElements);
  const content = items.slice(start, end);
  
  return {
    content,
    pageable: {
      pageNumber: page,
      pageSize: size
    },
    last: page >= totalPages - 1,
    totalElements,
    totalPages,
    number: page,
    size,
    first: page === 0,
    numberOfElements: content.length
  };
};

// 使用模擬數據的服務
export const reviewService = {
  /**
   * 獲取營地的評價列表
   * @param {number} campSiteId - 營地 ID
   * @param {number} page - 頁碼 (從 1 開始)
   * @param {number} size - 每頁顯示數量
   * @returns {Promise} - 評價列表
   */
  async getReviews(campSiteId, page = 1, size = 10) {
    // 在開發環境使用模擬數據
    if (process.env.NODE_ENV === 'development') {
      try {
        // 過濾指定營地的評價
        const filteredReviews = campSiteId 
          ? mockReviews.filter(r => r.campSiteId === campSiteId)
          : mockReviews;
          
        // 創建分頁響應
        return await mockResponse(createPageResponse(filteredReviews, page - 1, size));
      } catch (error) {
        console.error('模擬 API 錯誤:', error);
        throw error;
      }
    }
    
    // 實際環境調用 API
    try {
      const response = await axios.get(`${API_URL}/reviews/campsite/${campSiteId}`, {
        params: {
          page: page - 1, // 後端分頁從 0 開始
          size,
          userId: localStorage.getItem('userId') || null
        }
      });
      return response.data;
    } catch (error) {
      console.error('獲取評價列表失敗:', error);
      throw error;
    }
  },
  
  /**
   * 獲取評價詳情
   * @param {number} reviewId - 評價 ID
   * @returns {Promise} - 評價詳情
   */
  async getReviewById(reviewId) {
    // 開發環境使用模擬數據
    if (process.env.NODE_ENV === 'development') {
      const review = mockReviews.find(r => r.id === reviewId);
      
      if (!review) {
        throw new Error('評價不存在');
      }
      
      return await mockResponse(review);
    }
    
    // 實際環境調用 API
    try {
      const response = await axios.get(`${API_URL}/reviews/${reviewId}`, {
        params: {
          userId: localStorage.getItem('userId') || null
        }
      });
      return response.data;
    } catch (error) {
      console.error('獲取評價詳情失敗:', error);
      throw error;
    }
  },
  
  /**
   * 創建新評價
   * @param {Object} reviewData - 評價數據
   * @returns {Promise} - 創建的評價
   */
  async createReview(reviewData) {
    // 開發環境使用模擬數據
    if (process.env.NODE_ENV === 'development') {
      const newReview = {
        id: mockReviews.length + 1,
        ...reviewData,
        userName: '目前用戶',
        likeCount: 0,
        userLikeStatus: 0,
        createdAt: new Date().toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        updatedAt: new Date().toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
      
      mockReviews.unshift(newReview);
      return await mockResponse(newReview);
    }
    
    // 實際環境調用 API
    try {
      const response = await axios.post(`${API_URL}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      console.error('創建評價失敗:', error);
      throw error;
    }
  },
  
  /**
   * 更新評價
   * @param {number} reviewId - 評價 ID
   * @param {Object} reviewData - 更新的評價數據
   * @returns {Promise} - 更新後的評價
   */
  async updateReview(reviewId, reviewData) {
    // 開發環境使用模擬數據
    if (process.env.NODE_ENV === 'development') {
      const index = mockReviews.findIndex(r => r.id === reviewId);
      
      if (index === -1) {
        throw new Error('評價不存在');
      }
      
      const updatedReview = {
        ...mockReviews[index],
        ...reviewData,
        updatedAt: new Date().toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
      
      mockReviews[index] = updatedReview;
      return await mockResponse(updatedReview);
    }
    
    // 實際環境調用 API
    try {
      const response = await axios.put(`${API_URL}/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      console.error('更新評價失敗:', error);
      throw error;
    }
  },
  
  /**
   * 刪除評價
   * @param {number} reviewId - 評價 ID
   * @param {number} userId - 用戶 ID
   * @returns {Promise} - 刪除結果
   */
  async deleteReview(reviewId, userId) {
    // 開發環境使用模擬數據
    if (process.env.NODE_ENV === 'development') {
      const index = mockReviews.findIndex(r => r.id === reviewId);
      
      if (index === -1) {
        throw new Error('評價不存在');
      }
      
      // 檢查是否為評價作者
      if (mockReviews[index].userId !== userId) {
        throw new Error('無權限刪除此評價');
      }
      
      mockReviews.splice(index, 1);
      return await mockResponse({ success: true });
    }
    
    // 實際環境調用 API
    try {
      const response = await axios.delete(`${API_URL}/reviews/${reviewId}`, {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      console.error('刪除評價失敗:', error);
      throw error;
    }
  },
  
  /**
   * 切換評價點讚狀態
   * @param {number} reviewId - 評價 ID
   * @param {number} userId - 用戶 ID
   * @returns {Promise} - 操作結果
   */
  async toggleLike(reviewId, userId) {
    // 開發環境使用模擬數據
    if (process.env.NODE_ENV === 'development') {
      const index = mockReviews.findIndex(r => r.id === reviewId);
      
      if (index === -1) {
        throw new Error('評價不存在');
      }
      
      const review = mockReviews[index];
      const newStatus = review.userLikeStatus === 1 ? 0 : 1;
      const likeDelta = newStatus === 1 ? 1 : -1;
      
      mockReviews[index] = {
        ...review,
        userLikeStatus: newStatus,
        likeCount: review.likeCount + likeDelta
      };
      
      return await mockResponse({ success: true });
    }
    
    // 實際環境調用 API
    try {
      const response = await axios.post(`${API_URL}/reviews/${reviewId}/like`, null, {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      console.error('點讚操作失敗:', error);
      throw error;
    }
  },
  
  /**
   * 管理員回覆評價
   * @param {number} reviewId - 評價 ID
   * @param {string} replyText - 回覆內容
   * @returns {Promise} - 更新後的評價
   */
  async replyToReview(reviewId, replyText) {
    // 開發環境使用模擬數據
    if (process.env.NODE_ENV === 'development') {
      const index = mockReviews.findIndex(r => r.id === reviewId);
      
      if (index === -1) {
        throw new Error('評價不存在');
      }
      
      mockReviews[index] = {
        ...mockReviews[index],
        replyText,
        updatedAt: new Date().toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
      
      return await mockResponse(mockReviews[index]);
    }
    
    // 實際環境調用 API
    try {
      const response = await axios.post(`${API_URL}/reviews/${reviewId}/reply`, null, {
        params: { replyText }
      });
      return response.data;
    } catch (error) {
      console.error('回覆評價失敗:', error);
      throw error;
    }
  },
  
  /**
   * 搜尋評價
   * @param {Object} params - 搜尋參數
   * @returns {Promise} - 搜尋結果
   */
  async searchReviews(params) {
    // 開發環境使用模擬數據
    if (process.env.NODE_ENV === 'development') {
      let filtered = [...mockReviews];
      
      // 根據營地 ID 過濾
      if (params.campSiteId) {
        filtered = filtered.filter(r => r.campSiteId === params.campSiteId);
      }
      
      // 根據關鍵字過濾
      if (params.keyword) {
        const keyword = params.keyword.toLowerCase();
        filtered = filtered.filter(r => 
          r.reviewText.toLowerCase().includes(keyword) || 
          (r.pros && r.pros.toLowerCase().includes(keyword)) || 
          (r.cons && r.cons.toLowerCase().includes(keyword))
        );
      }
      
      // 根據最低評分過濾
      if (params.minRating) {
        filtered = filtered.filter(r => r.overallRating >= params.minRating);
      }
      
      // 排序
      if (params.sortBy) {
        const sortDir = params.sortDirection === 'ASC' ? 1 : -1;
        filtered.sort((a, b) => {
          if (a[params.sortBy] < b[params.sortBy]) return -1 * sortDir;
          if (a[params.sortBy] > b[params.sortBy]) return 1 * sortDir;
          return 0;
        });
      }
      
      // 創建分頁響應
      return await mockResponse(createPageResponse(filtered, params.page || 0, params.size || 10));
    }
    
    // 實際環境調用 API
    try {
      const response = await axios.get(`${API_URL}/reviews/search`, { params });
      return response.data;
    } catch (error) {
      console.error('搜尋評價失敗:', error);
      throw error;
    }
  },
  
  /**
   * 獲取營地平均評分
   * @param {number} campSiteId - 營地 ID
   * @returns {Promise} - 平均評分
   */
  async getAverageRating(campSiteId) {
    // 開發環境使用模擬數據
    if (process.env.NODE_ENV === 'development') {
      const filteredReviews = campSiteId 
        ? mockReviews.filter(r => r.campSiteId === campSiteId)
        : mockReviews;
      
      if (filteredReviews.length === 0) {
        return await mockResponse(0);
      }
      
      const sum = filteredReviews.reduce((acc, r) => acc + r.overallRating, 0);
      const average = parseFloat((sum / filteredReviews.length).toFixed(1));
      
      return await mockResponse(average);
    }
    
    // 實際環境調用 API
    try {
      const response = await axios.get(`${API_URL}/reviews/average-rating/${campSiteId}`);
      return response.data.averageRating;
    } catch (error) {
      console.error('獲取平均評分失敗:', error);
      throw error;
    }
  },
  
  /**
   * 上傳評價圖片 (模擬)
   * @param {File} file - 圖片文件
   * @param {number} reviewId - 評價 ID (可選)
   * @returns {Promise} - 上傳結果
   */
  async uploadImage(file, reviewId = null) {
    // 開發環境使用模擬數據
    if (process.env.NODE_ENV === 'development') {
      // 模擬上傳延遲
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 返回模擬圖片 URL
      return {
        imageUrl: `https://via.placeholder.com/400x300?text=上傳圖片${Date.now()}`
      };
    }
    
    // 實際環境調用 API
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (reviewId) {
        formData.append('reviewId', reviewId);
      }
      
      const response = await axios.post(`${API_URL}/review-images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('上傳圖片失敗:', error);
      throw error;
    }
  },
  
  /**
   * 批量上傳評價圖片 (模擬)
   * @param {Array<File>} files - 圖片文件數組
   * @param {number} reviewId - 評價 ID (可選)
   * @returns {Promise} - 上傳結果
   */
  async uploadMultipleImages(files, reviewId = null) {
    // 開發環境使用模擬數據
    if (process.env.NODE_ENV === 'development') {
      // 模擬上傳延遲
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 返回模擬圖片 URL 數組
      return files.map((_, index) => ({
        imageUrl: `https://via.placeholder.com/400x300?text=上傳圖片${Date.now() + index}`
      }));
    }
    
    // 實際環境調用 API
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      if (reviewId) {
        formData.append('reviewId', reviewId);
      }
      
      const response = await axios.post(`${API_URL}/review-images/upload-multiple`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('批量上傳圖片失敗:', error);
      throw error;
    }
  }
}