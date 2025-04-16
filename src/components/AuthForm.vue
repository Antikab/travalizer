<!-- authform.vue -->
<script setup>
import { inject } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Message from 'primevue/message'

import { useAuth } from '../auth'
import GoogleAuthLink from '../components/GoogleAuthLink.vue'

const { error } = useAuth()

const credentials = inject('credentials')
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl w-full flex flex-col md:flex-row overflow-hidden">
      <!-- Левая колонка: Форма -->
      <div
        class="lg:w-[550px] md:[450px] w-full flex flex-col items-center p-[32px_24px_30px] md:p-[48px_64px_66px]"
      >
        <div class="flex flex-col w-full">
          <div class="h-[48px] mb-[56px] flex gap-4 items-center">
            <inline-svg
              class="text-primary-color size-[48px]"
              src="/src/assets/icons/Logo.svg"
              aria-label="icon-logo"
              role="img"
              fill="currentColor"
            />
            <h1 class="title-32">Travalizer</h1>
          </div>
          <slot name="header"></slot>
        </div>

        <form class="flex flex-col md:min-w-full md:max-w-[422px]">
          <Message v-if="error" severity="warn">{{ error }}</Message>

          <label for="email" class="text-primary-color font-semibold mt-8 mb-2">Email</label>
          <IconField class="flex items-center">
            <InputIcon class="pi pi-envelope mr-2" />
            <InputText
              id="email"
              type="email"
              v-model="credentials.email"
              placeholder="robert.langster@gmail.com"
              class="w-full"
            />
          </IconField>

          <label for="pv_id_6" class="text-primary-color font-semibold mt-6 mb-2">Password</label>
          <IconField class="flex items-center">
            <InputIcon class="pi pi-key mr-2" />
            <Password
              v-model="credentials.password"
              type="password"
              placeholder="Password"
              toggleMask
              class="w-full"
            />
          </IconField>

          <!-- Доп. опции (Remember me / Forgot password?) -->
          <div class="flex items-center justify-between text-sm text-gray-600 my-6">
            <label class="flex items-center justify-center text-primary-color gap-2">
              <input type="checkbox" class="mr-1" /> Remember me
            </label>
            <a href="#" class="text-primary-color underline">Forgot password?</a>
          </div>

          <slot name="form"> </slot>

          <!-- Альтернативный вход -->
          <div class="flex items-center mt-[56px]">
            <div class="flex justify-center flex-wrap gap-6 text-center text-primary-color-2">
              Or, login with
              <div class="flex gap-6">
                <GoogleAuthLink />
                <a class="text-neutral-400 cursor-not-allowed">Facebook</a>
                <a class="text-neutral-400 cursor-not-allowed">LinkedIn</a>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Правая колонка: Иллюстрация (показывается только на десктопе) -->
      <div
        class="hidden md:flex xl:w-[746px] bg-secondary-color items-center justify-center md:p-10 lg:p-[188px_123px]"
      >
        <img src="/image/travel-logo.webp?url" alt="Van illustration" class="w-full" />
      </div>
    </div>
  </div>
</template>
