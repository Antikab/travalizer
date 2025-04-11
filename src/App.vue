<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from './auth'
import LogoutButton from './components/LogoutButton.vue'

const { userInfo } = useAuth()
const token = computed(() => userInfo.value.token)
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="flex justify-center">
        <div class="flex flex-col gap-2">
          <RouterLink to="/">Домой</RouterLink>
          <template v-if="!token">
            <RouterLink to="/signup">Зарегистрироваться</RouterLink>
            <RouterLink to="/signin">Войти</RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/list">Cписок</RouterLink>
            <LogoutButton />
          </template>
        </div>
      </div>
    </div>
  </header>

  <main class="mt-10 flex justify-center">
    <RouterView />
  </main>
</template>
