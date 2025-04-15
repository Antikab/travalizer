// src/api.js
import axios from 'axios'
import { useAuth } from './auth'
import router from './router'

const axiosApiInstance = axios.create()
const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

axiosApiInstance.interceptors.request.use((config) => {
  // Используем наше состояние авторизации
  const { userInfo } = useAuth()
  const url = config.url
  if (!url.includes('signInWithPassword') && !url.includes('signUp')) {
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
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.warn('Получен 401, начинаем обновление токена...')
      originalRequest._retry = true
      try {
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
        // Повторяем запрос с новым токеном
        originalRequest.params.useAuth = userInfo.value.token
        return axiosApiInstance(originalRequest)
      } catch (err) {
        console.error(
          'Ошибка при обновлении токена:',
          err.response ? err.response.data : err.message
        )
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
