<template>
  <div class="pokemon-lists">
    <div class="pokemon-list">
      <PokemonCard
        v-for="pokemon in paginatedPokemons"
        :key="pokemon.id" 
        :pokemon="pokemon" 
      />
    </div>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :onPageChange="changePage"
    />
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
  setup(props) {
    const currentPage = ref(1);
    const itemsPerPage = 8;

    const totalPages = computed(() => {
      return Math.ceil(props.pokemons.length / itemsPerPage);
    });

    const paginatedPokemons = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage; // Corrigido para usar 0-index
      const end = start + itemsPerPage;
      return props.pokemons.slice(start, end);
    });

    const changePage = (page: number) => {
      currentPage.value = page;
    };

    return {
      currentPage,
      totalPages,
      paginatedPokemons,
      changePage,
    };
  },
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
