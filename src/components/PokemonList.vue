<template>
  <div class="pokemon-list">
    <PokemonCard v-for="pokemon in pokemons" :key="pokemon.name" :pokemon="pokemon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PokemonCard from "./PokemonCard.vue";

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
  components: { PokemonCard },
});
</script>
