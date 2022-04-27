import { createRouter, createWebHistory } from 'vue-router'
import Guess from '../views/Guess.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:type',
      name: 'guess',
      component: Guess
    },
  ]
})

export default router
