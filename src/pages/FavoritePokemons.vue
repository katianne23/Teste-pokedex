<template>
  <div class="pokemon-favorite">
    <h2 class="title">O seu Pokémon preferido</h2>
    <div v-if="favoritePokemons.length === 0">
      <p>
        Ainda não há favoritos! <br />
        <a href="/">Comece </a>a adicionar alguns.
      </p>
    </div>
    <div v-else class="pokemon-list">
      <PokemonCard
        v-for="pokemon in favoritePokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
import axios from "axios";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export default defineComponent({
  components: { PokemonCard },
  setup() {
    const favoritePokemons: Ref<Pokemon[]> = ref([]);

    const loadFavoritePokemons = async () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

      if (favorites.length > 0) {
        const promises = favorites.map((id: number) =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        );
        const responses = await Promise.all(promises);
        favoritePokemons.value = responses.map((response) => response.data);
      }
    };

    onMounted(() => {
      loadFavoritePokemons();
    });

    return {
      favoritePokemons,
    };
  },
});
</script>

<style scoped>
.title {
  font-size: 2em;
  margin: 8px 0;
  font-family: var(--kanit);
  font-weight: 800;
  text-transform: capitalize;
}

p {
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.9em;
  font-family: var(--Nunito);
  font-weight: 600;
}

a {
  font-weight: 800;
  text-decoration: none;
  color: #000;
  cursor: pointer;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
}

.pokemon-list > * {
  margin-bottom: 20px;
}
</style>
