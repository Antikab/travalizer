<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import MyButton from '@/components/MyButton.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import Loader from '@/components/Loader.vue'

const router = useRouter()

const pokemons = ref(null)
const loading = ref(true)

const fetchPokemons = async () => {
  try {
    const response = await axios('https://pokeapi.co/api/v2/pokemon?limit=16')
    const data = response.data
    pokemons.value = data.results.map((pokemon, index) => ({
      id: index + 1,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
    }))
  } catch (error) {
    console.error('Ошибка загрузки покемонов:', error)
  } finally {
    loading.value = false
  }
}

const goToDetail = (id) => {
  router.push({ name: 'PokemonsDetail', params: { id } })
}

onMounted(() => {
  fetchPokemons()
})
</script>

<template>
  <div class="min-h-screen min-w-min flex flex-col gap-8 p-6">
    <Loader v-if="loading" />
    <div v-else class="flex flex-col gap-8">
      <div class="flex justify-end">
        <LogoutButton />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          class="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-center items-center"
        >
          <img
            :src="pokemon.image"
            :alt="pokemon.name"
            class="w-[160px] h-[120px] lg:w-[260px] lg:h-[170px] object-contain mb-4"
          />
          <h3 class="text-lg font-semibold text-center mb-4">{{ pokemon.name }}</h3>

          <MyButton
            label="More details"
            class="max-w-max"
            @click="goToDetail(pokemon.id)"
            variant="secondary"
          />
        </div>
      </div>
    </div>
  </div>
</template>
