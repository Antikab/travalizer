<script setup>
const props = defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  variant: { type: String, default: 'primary' }
})

const variantClasses = {
  primary: 'bg-primary-color-3 hover:bg-primary-color-2 text-white',
  secondary: 'bg-primary-color-4 hover:bg-primary-color-5 text-primary-color hover:text-black',
  danger: 'bg-red-700 hover:bg-red-600 text-white',
  outline: 'bg-white border border-bg-primary-color-3 hover:bg-green-100 text-primary-color-3'
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-4 py-2 disabled:opacity-50 transition cursor-pointer"
    :class="['px-4 py-2 rounded-lg transition disabled:opacity-50', variantClasses[variant]]"
  >
    {{ label }}
  </button>
</template>
