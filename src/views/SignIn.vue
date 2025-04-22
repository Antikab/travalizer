<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuth } from '../auth'

import AuthForm from '@/components/AuthForm.vue'
import MyButton from '@/components/MyButton.vue'
import Loader from '@/components/Loader.vue'

const { sign, loader, error } = useAuth()
const router = useRouter()

const credentials = ref({
  email: '',
  password: ''
})

const signin = async () => {
  try {
    await sign({ email: credentials.value.email, password: credentials.value.password }, 'signin')
    router.push({ name: 'Pokemons' })
  } catch (err) {
    console.error(err)
  }
}

const goSignup = () => {
  router.push({ name: 'Signup' })
}
</script>

<template>
  <AuthForm v-model="credentials" :error="error">
    <template #header>
      <div class="flex flex-col gap-4">
        <p class="title-20 md:title-24">
          Artificial Intelligence giving you travel recommendations
        </p>
        <p class="title-16">Welcome Back, Please login to your account</p>
      </div>
    </template>

    <template #form>
      <Loader v-if="loader" />

      <div v-else class="flex gap-6">
        <MyButton label="Login" type="submit" @click.prevent="signin" class="flex-1" />
        <MyButton label="Sign Up" @click="goSignup" class="flex-1" variant="outline" />
      </div>
    </template>
  </AuthForm>
</template>
