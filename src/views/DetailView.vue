<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import LogoutButton from '@/components/LogoutButton.vue'
import Loader from '@/components/Loader.vue'

const route = useRoute()
const router = useRouter()

const pokemon = ref(null)
const loading = ref(true)

const fetchPokemonDetail = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
    const data = await response.json()
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

onMounted(() => {
  fetchPokemonDetail()
})

const goBack = () => {
  router.push({ name: 'Pokemons' })
}
</script>

<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen">
    <div class="flex justify-between items-center">
      <Button label="Назад" @click="goBack" />
      <LogoutButton />
    </div>

    <Card v-if="!loading && pokemon" class="max-w-md mx-auto p-4 shadow-lg">
      <template #header>
        <img :src="pokemon.image" :alt="pokemon.name" class="w-full object-contain p-4 h-64" />
      </template>

      <template #title>
        <h2 class="text-2xl font-bold text-center">{{ pokemon.name }}</h2>
      </template>

      <template #content>
        <ul class="space-y-2 text-lg">
          <li><b>Рост:</b> {{ pokemon.height }}</li>
          <li><b>Вес:</b> {{ pokemon.weight }}</li>
          <li><b>Тип:</b> {{ pokemon.types }}</li>
          <li><b>Способности:</b> {{ pokemon.abilities }}</li>
        </ul>
      </template>
    </Card>

    <Loader v-if="loading" class="mx-auto" />
  </div>
</template>
