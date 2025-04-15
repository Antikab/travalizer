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
  <a
    href="#"
    @click.prevent="handleGoogleClick"
    class="text-primary-color font-semibold cursor-pointer hover:underline"
  >
    Google
  </a>
</template>
