<template>
  <div class="pokemon-lists">
    <SearchBar @search="handleSearch" />
    <TypeFilter @filter="handleTypeFilter" />

    <div v-if="isLoading" class="loading">
      <div class="pokemon">
      </div>
    </div>
    
    <div v-if="!isLoading &&  filteredPokemons.length === 0" class="no-pokemon">
      <p>Nenhum pokemon encontrado!!</p>
    </div>
    
    <div v-else class="pokemon-list">
      <PokemonCard
        v-for="pokemon in paginatedPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>

    <Pagination
      v-if="!isLoading &&  filteredPokemons.length > 0"
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
import TypeFilter from "./TypeFilter.vue";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: string[];
}

export default defineComponent({
  props: {
    pokemons: {
      type: Array as () => Pokemon[],
      required: true,
    },
  },
  components: { PokemonCard, Pagination, SearchBar, TypeFilter },

  setup(props) {
    const currentPage = ref(1);
    const itemsPerPage = 8;
    const searchTerm = ref("");
    const selectedType = ref("");
    const isLoading = ref(true);

    setTimeout(() => {
      isLoading.value = false; 
    }, 1000); 

    const totalPages = computed(() => {
      return Math.ceil(filteredPokemons.value.length / itemsPerPage);
    });

    const filteredPokemons = computed(() => {
      let filtered = props.pokemons;

      if (searchTerm.value) {
        filtered = filtered.filter(
          (pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            pokemon.id.toString() === searchTerm.value
        );
      }

      if (selectedType.value) {
        filtered = filtered.filter((pokemon) =>
          pokemon.types.includes(selectedType.value)
        );
      }

      return filtered;
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

    const handleTypeFilter = (type: string) => {
      selectedType.value = type;
      currentPage.value = 1;
    };

    return {
      currentPage,
      totalPages,
      paginatedPokemons,
      filteredPokemons ,
      changePage,
      handleSearch,
      handleTypeFilter,
      isLoading,
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

.loading {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.pokemon {
  position: relative;
  height: 100px;
  width: 100px;
  background: linear-gradient(to bottom, rgb(254, 0, 1) 50%, white 50%);
  border-radius: 50%;
  border: 8px solid black;
  animation: spin 1s linear infinite;
}

.pokemon::before {
  content: '';
  position: absolute;
  height: 8px; 
  width: 100%; 
  background: black;
  top: 50%; 
  left: 0;
  transform: translateY(-50%); 
}

.pokemon::after {
  content: '';
  position: absolute;
  height: 38px;
  width: 38px;
  border-radius: 50%;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: inset 0 0 0 8px black, inset 0 0 0 10px white, inset 0 0 0 12px black;
}

.no-pokemon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5em;
  color: #555;
}


@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
