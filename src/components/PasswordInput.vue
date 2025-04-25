<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String },
  placeholder: { type: String, default: '' }
})

const model = defineModel({})
const showPassword = ref(false)
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="text-primary-color font-semibold">
      {{ label }}
    </label>
    <div
      class="bg-opacity-70 flex items-center gap-3 border border-primary-color-4 p-4 rounded-lg focus-within:border-primary-color-5 focus-within:ring focus-within:ring-primary-color-5 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="h-6 w-6 opacity-40 text-primary-color-5"
      >
        <path
          fill-rule="evenodd"
          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
          clip-rule="evenodd"
        />
      </svg>

      <input
        :id="id"
        v-model="model"
        :type="showPassword ? 'text' : 'password'"
        class="grow bg-transparent outline-none tracking-[0.2em] placeholder:tracking-normal"
        :placeholder="placeholder"
        required
      />
      <button
        type="button"
        @click="showPassword = !showPassword"
        class="focus:outline-none cursor-pointer"
        aria-label="Show/Hide password"
      >
        <template v-if="!showPassword">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5 text-primary-color-5 opacity-70 transition-all duration-300 ease-in-out transform hover:scale-110 hover:opacity-100"
          >
            <path
              fill-rule="evenodd"
              d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5 opacity-70 text-primary-color-5 transition-all duration-300 ease-in-out transform hover:scale-110 hover:opacity-100"
          >
            <path
              fill-rule="evenodd"
              d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
      </button>
    </div>
  </div>
</template>
