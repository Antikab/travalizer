<!-- src/components/GoogleAuthLink.vue -->
<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../auth'

const { signInWithGoogle, error } = useAuth()
const router = useRouter()

// Обработчик клика по "Google"
const handleGoogleClick = async () => {
  try {
    await signInWithGoogle()
    router.push('/list') // переход на /list после успешного входа
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div style="display: flex; gap: 0.5rem; align-items: center">
    <span>Or, login with</span>
    <a href="#" @click.prevent="handleGoogleClick" class="text-[#0c66c2] cursor-pointer">
      Google
    </a>
    <p v-if="error" style="color: red; margin: 0">{{ error }}</p>
  </div>
</template>
