<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import MyButton from '@/components/MyButton.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import Loader from '@/components/Loader.vue'

const route = useRoute()
const router = useRouter()

const pokemon = ref(null)
const loading = ref(true)

const fetchPokemonDetail = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
    const data = response.data

    pokemon.value = {
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      image: data.sprites.other['official-artwork'].front_default,
      height: data.height,
      weight: data.weight,
      types: data.types.map((t) => t.type.name).join(', '),
      abilities: data.abilities.map((a) => a.ability.name).join(', ')
    }
  } catch (error) {
    console.error('Ошибка загрузки деталей покемона:', error)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push({ name: 'Pokemons' })
}

onMounted(() => {
  fetchPokemonDetail()
})
</script>

<template>
  <div class="min-h-screen bg-primary-color p-6 flex flex-col gap-8">
    <Loader v-if="loading" />
    <div v-else class="flex flex-col gap-8">
      <div class="flex justify-between items-center mx-auto w-full">
        <MyButton label="Back" @click="goBack" variant="outline" />
        <LogoutButton />
      </div>
      <div
        class="w-full mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6"
      >
        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="w-48 h-48 object-contain mx-auto md:mx-0"
        />

        <div class="flex-1">
          <h2 class="text-3xl font-bold text-center md:text-left mb-4">{{ pokemon.name }}</h2>
          <ul class="space-y-2 text-lg">
            <li><strong>Height:</strong> {{ pokemon.height }}</li>
            <li><strong>Weight:</strong> {{ pokemon.weight }}</li>
            <li><strong>Type:</strong> {{ pokemon.types }}</li>
            <li><strong>Abilities:</strong> {{ pokemon.abilities }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
