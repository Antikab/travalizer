<script setup>
defineProps({ message: String })
</script>

<template>
  <div v-if="message" class="p-1 text-sm text-red-600 bg-red-100 border border-red-200 rounded">
    {{ message }}
  </div>
</template>
