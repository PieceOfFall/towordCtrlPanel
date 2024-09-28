import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: () => import('@/views/MonitorView.vue')
    },
    {
      path: '/series',
      name: 'series',
      component: () => import('@/views/SeriesView.vue')
    }
  ]
})

export default router
