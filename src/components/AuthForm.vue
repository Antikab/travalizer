<script setup>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Message from 'primevue/message'

import { useAuth } from '../auth'
import GoogleAuthLink from '../components/GoogleAuthLink.vue'

const { error } = useAuth()

const credentials = defineModel({
  type: Object,
  default: () => ({ email: '', password: '' })
})
</script>

<template>
  <div class="flex items-center justify-center w-full md:w-fit md:p-4">
    <div class="bg-white md:rounded-3xl w-full flex flex-col-reverse md:flex-row overflow-hidden">
      <!-- Левая колонка: Форма -->
      <div
        class="md:w-1/2 lg:w-[550px] w-full flex flex-col items-center grow p-[32px_24px] lg:p-[48px_64px_66px]"
      >
        <div class="flex flex-col w-full mb-8">
          <div class="hidden md:flex h-[48px] mb-[56px] gap-4 items-center">
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

        <form class="flex flex-col w-full md:max-w-[422px]">
          <label for="email" class="text-primary-color font-semibold mb-2">Email</label>
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

          <Message v-if="error" class="mt-6" severity="warn">{{ error }}</Message>

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

          <div class="flex items-center justify-between text-sm text-gray-600 my-6">
            <label class="flex items-center justify-center text-primary-color gap-2 select-none">
              <input
                type="checkbox"
                class="mr-1 accent-primary-color-3 focus:ring-offset-primary-color-4"
              />
              Remember me
            </label>
            <a href="#" class="text-primary-color underline">Forgot password?</a>
          </div>

          <slot name="form"> </slot>

          <!-- Альтернативный вход через гугл почту -->
          <div
            class="h-[64px] flex flex-col md:flex-row justify-end md:justify-start items-center gap-6 mt-[40px] text-center text-primary-color-2"
          >
            <div class="flex shrink-0">Or, login with</div>
            <div class="flex justify-around sm:justify-center md:justify-start w-full gap-6">
              <GoogleAuthLink />
              <a class="text-neutral-400 cursor-not-allowed">Facebook</a>
              <a class="text-neutral-400 cursor-not-allowed">LinkedIn</a>
            </div>
          </div>
        </form>
      </div>

      <!-- Правая колонка: Картинка  -->
      <div
        class="flex p-[35px_100px_30px] w-full md:w-1/2 md:grow xl:w-[746px] bg-secondary-color items-center justify-center md:p-10 lg:p-[188px_123px]"
      >
        <img src="/image/travel-logo.webp?url" alt="Van illustration" class="flex grow" />
      </div>
      <div
        class="flex items-center justify-center gap-4 md:hidden md:mb-[56px] p-[32px_106px] bg-primary-color"
      >
        <inline-svg
          class="text-white size-[48px]"
          src="/src/assets/icons/Logo.svg"
          aria-label="icon-logo"
          role="img"
          fill="currentColor"
        />
        <h1 class="title-32 text-white">Travalizer</h1>
      </div>
    </div>
  </div>
</template>
