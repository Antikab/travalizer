<script setup>
import TextInput from '@/components/TextInput.vue.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import Alert from '@/components/Alert.vue'

import GoogleAuthLink from '../components/GoogleAuthLink.vue'

defineProps({
  error: String
})

const credentials = defineModel({
  type: Object,
  default: () => ({ email: '', password: '' })
})
</script>

<template>
  <div class="flex items-center justify-center w-full md:w-fit md:p-4">
    <div class="bg-white md:rounded-3xl w-full flex flex-col-reverse md:flex-row overflow-hidden">
      <div
        class="md:w-1/2 lg:w-[550px] w-full flex flex-col items-center grow p-[32px_24px] lg:p-[48px_64px_66px]"
      >
        <div class="flex flex-col w-full mb-8">
          <div class="hidden md:flex h-[48px] mb-[56px] gap-4 items-center">
            <inline-svg
              class="text-primary-color size-[48px]"
              src="/icons/Logo.svg"
              aria-label="icon-logo"
              role="img"
              fill="currentColor"
            />
            <h1 class="title-32">Travalizer</h1>
          </div>
          <slot name="header"></slot>
        </div>

        <form class="flex flex-col w-full gap-6 md:max-w-[422px]">
          <TextInput
            id="email"
            label="Email"
            placeholder="Enter your email or username"
            v-model="credentials.email"
          />

          <Alert v-if="error" :message="error" />

          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            v-model="credentials.password"
          />

          <div class="flex items-center justify-between text-sm text-gray-600">
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

          <div
            class="flex flex-col md:flex-row justify-end md:justify-start items-center gap-6 mt-[56px] text-center text-primary-color-2"
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

      <div
        class="flex p-[35px_100px_30px] w-full md:w-1/2 md:grow xl:w-[746px] bg-secondary-color items-center justify-center md:p-10 lg:p-[188px_123px]"
      >
        <img src="/image/travel-logo.webp?url" alt="Van illustration" class="flex grow" />
      </div>
      <div
        class="flex items-center justify-center gap-4 md:hidden md:mb-[56px] p-[32px_106px] bg-primary-color"
      >
        <inline-svg
          class="flex shrink-0 text-white size-[48px]"
          src="/icons/Logo.svg"
          aria-label="icon-logo"
          role="img"
          fill="currentColor"
        />
        <h1 class="title-32 text-white">Travalizer</h1>
      </div>
    </div>
  </div>
</template>
