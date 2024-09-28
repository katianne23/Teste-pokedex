<template>
  <div class="pokemon-lists">
    <div class="pokemon-list">
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.name" :pokemon="pokemon" />
    </div>
   
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import PokemonCard from "./PokemonCard.vue";
import Pagination from "./Pagination.vue";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export default defineComponent({
  props: {
    pokemons: {
      type: Array as () => Pokemon[],
      required: true,
    },
  },
  components: { PokemonCard, Pagination },
});
</script>

<style scoped>
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
