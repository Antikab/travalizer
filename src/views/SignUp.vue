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

const signup = async () => {
  try {
    await sign({ email: email.value, password: password.value }, 'signup')
    router.push('/list')
  } catch (err) {
    console.error(err)
  }
}

const signin = () => {
  router.push('/signin')
}
</script>

<template>
  <AuthForm>
    <template #header>
      <p class="mb-6 text-gray-700 text-sm text-center">
        Artificial Intelligence giving you travel recommendations<br />
        Welcome Back, Please register your account
      </p>
    </template>

    <template #form>
      <!-- Индикатор загрузки -->
      <Loader v-if="loader" />

      <!-- Кнопки: устанавливаем тип button и привязываем обработчики -->
      <div v-else class="flex flex-col gap-2">
        <Button label="Register" type="submit" @click="signup" class="w-full" />
        <Button label="Sign In" type="button" @click="signin" class="w-full p-button-outlined" />
      </div>
    </template>
  </AuthForm>
</template>
