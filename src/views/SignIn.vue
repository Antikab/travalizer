<script setup>
import { ref } from 'vue'
import { useAuth } from '../auth'
import { useRouter } from 'vue-router'

import AuthForm from '../components/AuthForm.vue'
import Button from 'primevue/button'
import Loader from '../components/Loader.vue'

const { sign, loader } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')

const signin = async () => {
  try {
    await sign({ email: email.value, password: password.value }, 'signin')
    router.push({name: 'Pokemons'})
  } catch (err) {
    console.error(err)
  }
}

const signup = () => {
  router.push('/signup')
}
</script>

<template>
  <AuthForm>
    <template #header>
      <div class="flex flex-col gap-4">
        <p class="title-20 md:title-24">Artificial Intelligence giving you travel recommendations</p>
        <p class="title-16">Welcome Back, Please login to your account</p>
      </div>
    </template>

    <template #form>
      <!-- Индикатор загрузки -->
      <Loader v-if="loader" />

      <!-- Кнопки: устанавливаем тип button и привязываем обработчики -->
      <div v-else class="flex gap-6">
        <Button label="Login" type="submit" @click="signin" class="w-full" />
        <Button label="Sign Up" type="button" @click="signup" class="w-full p-button-outlined" />
      </div>
    </template>
  </AuthForm>
</template>
