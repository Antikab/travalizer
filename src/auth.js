// src/auth.js
import { ref } from 'vue'
import axiosApiInstance from './api'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

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
  // Обычная авторизация через Email/Password
  const sign = async (payload, type) => {
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword'
    error.value = ''
    loader.value = true
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`

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
      const message = err.response?.data?.error?.message
      console.error('Firebase error:', message)
      switch (message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email уже существует. Попробуйте войти.'
          break
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Операция не разрешена.'
          break
        case 'EMAIL_NOT_FOUND':
          error.value = 'Email не найден. Зарегистрируйтесь.'
          break
        case 'INVALID_PASSWORD':
          error.value = 'Неверный пароль.'
          break
        case 'INVALID_EMAIL':
          error.value = 'Неверный формат email.'
          break
        case 'INVALID_LOGIN_CREDENTIALS':
          error.value = 'Неверные данные для входа.'
          break
        case 'MISSING_PASSWORD':
          error.value = 'Необходимо ввести пароль.'
          break
        default:
          error.value = message || 'Что-то пошло не так'
          break
      }
      throw error.value
    } finally {
      loader.value = false
    }
  }

  // Вход через Google
  const signInWithGoogle = async () => {
    loader.value = true
    error.value = ''
    const authInstance = getAuth() // Получаем экземпляр Firebase Auth
    const provider = new GoogleAuthProvider() // Создаём провайдера Google
    try {
      // Запускаем всплывающее окно входа через Google
      const result = await signInWithPopup(authInstance, provider)
      // Получаем данные пользователя
      const user = result.user
      // Получаем токен; здесь можно использовать credential, но у объекта user есть нужные данные
      const credential = GoogleAuthProvider.credentialFromResult(result)
      console.log('credential', credential)
      const token = credential?.accessToken || user.stsTokenManager.accessToken
      userInfo.value = {
        token: token,
        email: user.email,
        userId: user.uid,
        refreshToken: user.stsTokenManager.refreshToken
      }
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: token,
          refreshToken: user.stsTokenManager.refreshToken
        })
      )
      return result
    } catch (err) {
      error.value = err.message || 'Ошибка авторизации через Google'
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

  return { userInfo, error, loader, sign, signInWithGoogle, logout }
}

export { useAuth }
