<template>
  <div class="home">
    <!-- 頂部封面區 -->
    <div class="hero-section mb-5">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold text-success">營地評價系統</h1>
            <p class="lead">發現最佳露營體驗，分享您的營地故事</p>
            <p class="mb-4">瀏覽真實用戶的評價，幫助您做出最佳選擇。或者分享您的露營經驗，協助其他露營愛好者。</p>
            <div class="d-flex flex-wrap gap-2">
              <router-link to="/reviews" class="btn btn-success btn-lg">
                查看評價
              </router-link>
              <button class="btn btn-outline-success btn-lg">
                撰寫評價
              </button>
            </div>
          </div>
          <div class="col-lg-6 mt-4 mt-lg-0">
            <img src="https://via.placeholder.com/600x400?text=營地風景" alt="營地風景" class="img-fluid rounded shadow">
          </div>
        </div>
      </div>
    </div>

    <!-- 熱門營地卡片 -->
    <div class="container mb-5">
      <div class="section-header mb-4">
        <h2 class="text-center">熱門營地</h2>
        <div class="divider mx-auto"></div>
      </div>
      
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card h-100 campsite-card">
            <img src="https://via.placeholder.com/400x250?text=營地照片" class="card-img-top" alt="營地照片">
            <div class="card-body">
              <h5 class="card-title">苗栗區 山之間</h5>
              <p class="card-text text-muted">苗栗縣泰安鄉</p>
              <div class="d-flex align-items-center mb-2">
                <div class="me-2">
                  <i class="bi bi-star-fill rating-star"></i>
                  <i class="bi bi-star-fill rating-star"></i>
                  <i class="bi bi-star-fill rating-star"></i>
                  <i class="bi bi-star-fill rating-star"></i>
                  <i class="bi bi-star-half rating-star"></i>
                </div>
                <span>4.5 (32則評價)</span>
              </div>
              <p class="card-text">位於群山環繞的秘境營地，提供絕佳的自然環境和完善的露營設施。</p>
            </div>
            <div class="card-footer bg-white border-top-0">
              <button class="btn btn-outline-success w-100">查看評價</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.hero-section {
  background-color: #f8f9fa;
  padding: 20px 0;
}

.divider {
  width: 70px;
  height: 3px;
  background-color: #198754;
  margin-top: 10px;
}

.campsite-card {
  transition: transform 0.3s ease;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.campsite-card:hover {
  transform: translateY(-5px);
}

.campsite-card img {
  height: 200px;
  object-fit: cover;
}
</style>