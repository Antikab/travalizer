<script setup>
import { useRouter } from 'vue-router'

import { useAuth } from '@/auth'
import MyButton from '@/components/MyButton.vue'

const { logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.replace({ name: 'Signin' })
}
</script>

<template>
  <MyButton label="Logout" @click="handleLogout" variant="danger" />
</template>
