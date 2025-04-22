<script setup>
defineProps({ message: String })
</script>

<template>
  <div v-if="message" class="text-red-600 bg-red-100 border border-red-200 p-2 rounded mt-6">
    {{ message }}
  </div>
</template>
