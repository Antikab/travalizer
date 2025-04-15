// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../auth'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/pokemons'
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
    path: '/pokemons',
    name: 'Pokemons',
    component: () => import('../views/ListView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pokemons/:id',
    name: 'PokemonsDetail',
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

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    return { name: 'Signin' }
  }
  if (to.matched.some((record) => record.meta.requiresGuest) && isAuthenticated) {
    return { name: 'Pokemons' }
  }
  return true
})

export default router
