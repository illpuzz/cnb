// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReviewList from '../views/ReviewList.vue'
import ReviewDetail from '../views/ReviewDetail.vue'
import ReportView from '../views/ReportView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.url),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: ReviewList
    },
    {
      path: '/reviews/:id',
      name: 'review-detail',
      component: ReviewDetail,
      props: true
    },
    {
      path: '/report/:reviewId',
      name: 'report',
      component: ReportView,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router