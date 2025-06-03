import { createRouter, createWebHistory } from 'vue-router'
import Portfolio from '../views/Portfolio.vue'
import CodeDisplay from '../views/CodeDisplay.vue'
import Cesium from '../views/Cesium.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'portfolio',
      component: Portfolio,
    },
    {
      path: '/code-display',
      name: 'code-display',
      component: CodeDisplay,
    },
    {
      path: '/cesium',
      name: 'cesium',
      component: Cesium,
    },
  ],
})

export default router
