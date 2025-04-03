<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="flex justify-center">
        <div class="flex flex-col gap-2">
          <RouterLink to="/">Домой</RouterLink>
          <RouterLink to="/signup">Зарегистрироваться</RouterLink>
          <RouterLink to="/signin">Войти</RouterLink>
          <RouterLink to="/list">список</RouterLink>
        </div>
      </div>
    </div>
  </header>

  <main class="mt-10 flex justify-center">
    <RouterView />
  </main>
</template>
