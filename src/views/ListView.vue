<script setup>
import LogoutButton from '@/components/LogoutButton.vue'
import Loader from '@/components/Loader.vue'

import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useRouter } from 'vue-router'

const pokemons = ref([])
const loading = ref(true)
const router = useRouter()

const fetchPokemons = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=16')
    const data = await response.json()
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
  <div class="flex flex-col gap-6 p-6">
    <div class="flex justify-end">
      <LogoutButton />
    </div>

    <Loader v-if="loading" class="mx-auto" />

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Card
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow"
      >
        <template #header>
          <img :src="pokemon.image" :alt="pokemon.name" class="w-full object-contain p-4 h-48" />
        </template>

        <template #title>
          <h3 class="text-xl font-bold text-center">{{ pokemon.name }}</h3>
        </template>

        <template #footer>
          <Button label="Подробнее" class="w-full" @click="goToDetail(pokemon.id)" />
        </template>
      </Card>
    </div>
  </div>
</template>
