import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import PhotoDetail from '../views/PhotoDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/img/:id',
      name: 'photo-detail',
      component: PhotoDetail,
      props: true,
    },
  ],
})

export default router
