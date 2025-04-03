// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '../auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/SignIn.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/SignUp.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/ListView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/list/:id',
    name: 'Detail',
    component: () => import('../views/DetailView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const { userInfo } = useAuth()
  const isAuthenticated = !!userInfo.value.token

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    return { name: 'Signin' }
  }
  if (to.matched.some(record => record.meta.requiresGuest) && isAuthenticated) {
    return { name: 'List' }
  }
})

export default router
