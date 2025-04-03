// src/auth.js
import { ref } from 'vue'
import axiosApiInstance from './api'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

// При инициализации пытаемся прочитать данные из localStorage
const storedTokens = localStorage.getItem('userTokens')
const userInfo = ref(
  storedTokens
    ? JSON.parse(storedTokens)
    : {
        token: '',
        email: '',
        userId: '',
        refreshToken: ''
      }
)
const error = ref('')
const loader = ref(false)

function useAuth() {
  const sign = async (payload, type) => {
    loader.value = true
    error.value = ''
    const url =
      type === 'signup'
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

    try {
      const res = await axiosApiInstance.post(url, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
      userInfo.value = {
        token: res.data.idToken,
        email: res.data.email,
        userId: res.data.localId,
        refreshToken: res.data.refreshToken
      }
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: res.data.idToken,
          refreshToken: res.data.refreshToken
        })
      )
    } catch (err) {
      error.value =
        err.response?.data?.error?.message || 'Что-то пошло не так'
      throw error.value
    } finally {
      loader.value = false
    }
  }

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: ''
    }
    localStorage.removeItem('userTokens')
  }

  return { userInfo, error, loader, sign, logout }
}

export { useAuth }
