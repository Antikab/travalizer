<script setup>
import { ref } from 'vue'
import { useAuth } from '../auth'
import { useRouter } from 'vue-router'

import Password from 'primevue/password'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Loader from '../components/Loader.vue'

const { sign, error, loader } = useAuth()
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
</script>

<template>
  <h2>Sign Up</h2>
  <form class="flex flex-col gap-3 justify-center items-center">
    <Message v-if="error" severity="warn">{{ error }}</Message>
    <IconField class="flex justify-center items-center">
      <InputIcon class="flex justify-center items-center pi pi-envelope" />
      <InputText type="email" v-model="email" placeholder="Your Email" />
    </IconField>
    <IconField class="flex justify-center items-center">
      <InputIcon class="flex justify-center items-center pi pi-key" />
      <Password v-model="password" toggleMask placeholder="Password" />
    </IconField>
    <Loader v-if="loader" />
    <div v-else class="flex flex-column gap-3">
      <Button label="Signup" @click="signup" />
      <span>Already registered? <router-link to="/signin">Sign in</router-link></span>
    </div>
  </form>
</template>
