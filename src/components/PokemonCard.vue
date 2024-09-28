<template>
    <div class="pokemon-card" v-if="pokemon">
      <img :src="pokemon.sprites.front_default || 'path/to/default-image.png'" :alt="pokemon.name" />
      <h3>{{ pokemon.name }}</h3>
      <p>#{{ pokemon.id }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  interface Pokemon {
      id: number;
      name: string;
      sprites: {
          front_default: string;
      };
  }
  
  export default defineComponent({
      props: {
          pokemon: {
              type: Object as () => Pokemon,
              required: true
          }
      },
      mounted() {
          console.log('Imagem do Pokémon:', this.pokemon.sprites.front_default); // Verifique a URL da imagem
      }
  });
  </script>
  
  <style scoped>
  .pokemon-card img {
      width: 100px; /* ou outro valor adequado */
      height: auto; /* manter a proporção da imagem */
  }
  </style>
  