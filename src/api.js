// src/api.js
import axios from 'axios'
import { useAuth } from './auth'
import router from './router'

const axiosApiInstance = axios.create()
const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

axiosApiInstance.interceptors.request.use((config) => {
  // Используем наше состояние авторизации
  const { userInfo } = useAuth()
  // Для запросов, отличных от signIn/signUp, добавляем параметр useAuth
  if (config.url && !config.url.includes('signInWithPassword') && !config.url.includes('signUp')) {
    let params = new URLSearchParams()
    params.append('useAuth', userInfo.value.token)
    config.params = params
  }
  return config
})

axiosApiInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    const { userInfo } = useAuth()
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      console.warn('Получен 401, начинаем обновление токена...')
      originalRequest._retry = true
      try {
        // Обновление токена через securetoken.googleapis.com
        const newTokens = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
          {
            grant_type: 'refresh_token',
            refresh_token: JSON.parse(localStorage.getItem('userTokens')).refreshToken
          }
        )
        console.log('newToken', newTokens.data)
        userInfo.value.token = newTokens.data.access_token
        userInfo.value.refreshToken = newTokens.data.refresh_token
        localStorage.setItem(
          'userTokens',
          JSON.stringify({
            token: newTokens.data.access_token,
            refreshToken: newTokens.data.refresh_token
          })
        )
      } catch (err) {
        console.log(err)
        localStorage.removeItem('userTokens')
        router.push('/signin')
        userInfo.value.token = ''
        userInfo.value.refreshToken = ''
      }
    }
    console.log(error)
    return Promise.reject(error)
  }
)

export default axiosApiInstance
