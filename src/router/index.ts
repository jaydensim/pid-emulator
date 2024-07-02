import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/app/EmulatorWelcome.vue')
    },
    {
      path: '/:id',
      component: () => import('../views/app/EmulatorLoader.vue')
    }
  ]
})

export default router
