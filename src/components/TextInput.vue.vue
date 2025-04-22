<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String },
  placeholder: { type: String, default: '' }
})

const model = defineModel({})
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
          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
        />
      </svg>

      <input
        :id="id"
        v-model="model"
        type="text"
        class="grow bg-transparent outline-none tracking-[0.2em]"
        :placeholder="placeholder"
        required
      />
    </div>
  </div>
</template>
