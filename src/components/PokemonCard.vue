<template>
  <div
    class="pokemon-card"
    v-if="pokemon"
    @click="goToDetails"
    :style="{ backgroundColor: backgroundColor, color: textColor }"
  >
    <div class="pokemon-image-container" :style="{ backgroundColor: textColor }">
      <img :src="getLargeImage(pokemon)" :alt="pokemon.name" class="pokemon-image" />
    </div>
    <div class="pokemon-text">
      <h3 class="pokemon-name">{{ pokemon.name }}</h3>
      <p class="pokemon-id">{{ pokemon.id }}</p>
      <div @click.stop="toggleFavorite" :style="{ color: textColor }" class="button">
        {{ isFavorite ? "★ " : "☆ " }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny?: string;
    front_female?: string;
    other?: {
      [key: string]: {
        front_default: string;
      };
    };
  };
}

export default defineComponent({
  props: {
    pokemon: {
      type: Object as () => Pokemon,
      required: true,
    },
  },
  data() {
    return {
      backgroundColor: "#fff",
      textColor: "#000",
    };
  },
  setup(props) {
    const isFavorite = ref(checkIfFavorite());

    function checkIfFavorite() {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      return favorites.includes(props.pokemon.id);
    }

    function toggleFavorite() {
      let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

      if (isFavorite.value) {
        favorites = favorites.filter((id: number) => id !== props.pokemon.id);
      } else {
        favorites.push(props.pokemon.id);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      isFavorite.value = !isFavorite.value;
    }
    return {
      isFavorite,
      toggleFavorite,
    };
  },
  async mounted() {
    try {
      const speciesResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${this.pokemon.id}`
      );
      const colorName = speciesResponse.data.color.name;

      this.setPokemonColors(colorName);
    } catch (error) {
      console.error("Erro ao buscar cor do Pokémon:", error);
    }
  },
  methods: {
    setPokemonColors(colorName: string) {
      const colorMap: { [key: string]: { bg: string; text: string } } = {
        black: { bg: "#666666", text: "#111111" },
        blue: { bg: "#a0e1f7", text: "#0073e6" },
        brown: { bg: "#d9b594", text: "#8b4513" },
        gray: { bg: "#d3d3d3", text: "#4f4f4f" },
        green: { bg: "#b0e57c", text: "#008000" },
        pink: { bg: "#ffcccb", text: "#ff69b4" },
        purple: { bg: "#dda0dd", text: "#800080" },
        red: { bg: "#f28b82", text: "#c62828" },
        white: { bg: "#f8f8f8", text: "#C0C0C0" },
        yellow: { bg: "#ffffcc", text: "#e7e772" },
      };

      const color = colorMap[colorName] || { bg: "#ffffff", text: "#000000" };
      this.backgroundColor = color.bg;
      this.textColor = color.text;
    },
    goToDetails() {
      this.$router.push({ name: "PokemonDetails", params: { id: this.pokemon.id } });
    },
    getLargeImage(pokemon: Pokemon): string {
      if (pokemon.sprites.other) {
        return (
          pokemon.sprites.other["official-artwork"].front_default ||
          pokemon.sprites.front_default
        );
      }
      return pokemon.sprites.front_default;
    },
  },
});
</script>

<style scoped>
.pokemon-card {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 250px;
  height: 320px;
  transition: transform 0.2s;
  margin: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

.pokemon-image-container {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
}

.pokemon-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.pokemon-text {
  margin-top: 5%;
}

.pokemon-name {
  font-size: 2em;
  margin: 8px 0;
  font-family: var(--kanit);
  font-weight: 800;
  text-transform: capitalize;
}

.pokemon-id {
  font-size: 1em;
  font-family: var(--kanit);
  font-weight: 800;
  margin-bottom: 0;
  font-weight: 800;
}

.button {
  font-size: 2em;
}
</style>
