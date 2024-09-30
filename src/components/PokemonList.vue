<template>
  <div class="pokemon-lists">
    <SearchBar @search="handleSearch" />
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
import SearchBar from "./SearchBar.vue";

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
  components: { PokemonCard, Pagination, SearchBar },

  setup(props) {
    const currentPage = ref(1);
    const itemsPerPage = 8;
    const searchTerm = ref("");

    const totalPages = computed(() => {
      return Math.ceil(filteredPokemons.value.length / itemsPerPage);
    });

    const filteredPokemons = computed(() => {
      if (!searchTerm.value) {
        return props.pokemons;
      }
      return props.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        pokemon.id.toString() === searchTerm.value
      );
    });


    const paginatedPokemons = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage; 
      const end = start + itemsPerPage;
      return filteredPokemons.value.slice(start, end);
    });

    const changePage = (page: number) => {
      currentPage.value = page;
    };

    const handleSearch = (term: string) => {
      searchTerm.value = term;
      currentPage.value = 1;
    };

    return {
      currentPage,
      totalPages,
      paginatedPokemons,
      changePage,
      handleSearch,
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