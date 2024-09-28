<template>
    <div class="home-page">
      <PokemonList :pokemons="pokemons" />
      
    </div>
  </template>
  
  <script lang="ts">
  import { onMounted } from 'vue';
  import PokemonList from '../components/PokemonList.vue';
  import { usePokemon } from '../composables/usePokemon';
  
  export default {
    components: { PokemonList },
    setup() {
      const { pokemons, fetchPokemons } = usePokemon();
  
      onMounted(() => {
        fetchPokemons(1);
      });
  
      return { pokemons };
    }
  }
  </script>
  
