<script setup>
import { useAuth } from '@/auth'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const { logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/signin')
}
</script>

<template>
  <Button label="Logout" @click="handleLogout" class="p-button-danger" />
</template>
