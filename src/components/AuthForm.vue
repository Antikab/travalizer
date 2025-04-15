<script setup>
import { ref } from 'vue'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Message from 'primevue/message'

import { useAuth } from '../auth'
import GoogleAuthLink from '../components/GoogleAuthLink.vue'

const { error } = useAuth()

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded-lg w-full flex flex-col md:flex-row overflow-hidden">
      <!-- Левая колонка: Форма -->
      <div class="flex flex-col items-center p-6">
        <div class="w-full p-8 flex flex-col justify-center items-center">
          <h2 class="text-2xl font-bold mb-2">Travalizer</h2>
          <slot name="header"></slot>
        </div>

        <form class="flex flex-col gap-4 md:min-w-full md:max-w-[422px]">
          <Message v-if="error" severity="warn">{{ error }}</Message>

          <label for="email" class="font-semibold">Email</label>
          <IconField class="flex items-center">
            <InputIcon class="pi pi-envelope mr-2" />
            <InputText
              id="email"
              type="email"
              v-model="email"
              placeholder="robert.langster@gmail.com"
              class="w-full"
            />
          </IconField>

          <label for="pv_id_6" class="font-semibold">Password</label>
          <IconField class="flex items-center">
            <InputIcon class="pi pi-key mr-2" />
            <Password
              v-model="password"
              type="password"
              placeholder="Password"
              toggleMask
              class="w-full"
            />
          </IconField>

          <!-- Доп. опции (Remember me / Forgot password?) -->
          <div class="flex items-center justify-between text-sm text-gray-600">
            <label> <input type="checkbox" class="mr-1" /> Remember me </label>
            <a href="#" class="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <slot name="form"> </slot>
          <!-- Альтернативный вход -->
          <div class="text-center text-sm text-primary-color-2 mt-2">Or, login with</div>
          <div class="flex justify-center gap-3 text-blue-600 text-sm">
            <GoogleAuthLink />
            <a class="text-neutral-500 cursor-not-allowed">Facebook</a>
            <a class="text-neutral-500 cursor-not-allowed">LinkedIn</a>
          </div>
        </form>
      </div>

      <!-- Правая колонка: Иллюстрация (показывается только на десктопе) -->
      <div class="hidden md:flex bg-secondary-color items-center justify-center p-6">
        <img src="/image/travel-logo.webp?url" alt="Van illustration" class="max-w-md" />
      </div>
    </div>
  </div>
</template>
