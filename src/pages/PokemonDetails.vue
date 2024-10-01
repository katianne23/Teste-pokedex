<template>
  <div v-if="pokemon">
    <div class="pokemon-details" :style="{ color: textColor }">
      <h2 class="pokemon-name">{{ pokemon.name }} <br />{{ pokemon.id }}</h2>
      <div class="pokemon-container">
        <div class="image-container">
          <img
            :src="pokemon.sprites.other['official-artwork'].front_default"
            :alt="pokemon.name"
          />
        </div>
        <div class="stats" :style="{ color: textColor }">
          <h3>Estatísticas</h3>
          <ul>
            <li v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat-item">
              <div class="stat-label">{{ stat.stat.name }}: {{ stat.base_stat }}</div>
              <div class="stat-bar-container">
                <div
                  class="stat-bar"
                  :style="{
                    width: stat.base_stat + '%',
                    backgroundColor: backgroundColor,
                  }"
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="types">
        <h3>Tipos</h3>
        <span
          v-for="type in pokemon.types"
          :key="type.type.name"
          :class="`type-${type.type.name}`"
        >
          {{ type.type.name }}
        </span>
      </div>

      <div class="evolutions" v-if="evolutions.length">
        <h3>Evoluções</h3>
        <div class="evolution-chain">
          <div v-for="evo in evolutions" :key="evo.id" class="evolution-item">
            <img
              :src="evo.sprites.other['official-artwork'].front_default"
              :alt="evo.name"
            />
            <p>{{ evo.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pokemon: null as any,
      evolutions: [] as any[],
      backgroundColor: "#ffffff",
      textColor: "#000000",
    };
  },
  async created() {
    await this.fetchPokemonDetails();
    await this.fetchPokemonEvolution();
  },
  methods: {
    async fetchPokemonDetails() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        this.pokemon = response.data;

        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${this.id}`
        );
        const colorName = speciesResponse.data.color.name;
        this.setPokemonColors(colorName);
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
      }
    },
    async fetchPokemonEvolution() {
      try {
        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${this.id}`
        );
        const evolutionUrl = speciesResponse.data.evolution_chain.url;

        const evolutionResponse = await axios.get(evolutionUrl);
        let chain = evolutionResponse.data.chain;

        while (chain) {
          const evolutionDetails = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${chain.species.name}`
          );
          this.evolutions.push(evolutionDetails.data);
          chain = chain.evolves_to[0];
        }
      } catch (error) {
        console.error("Erro ao buscar cadeia de evolução:", error);
      }
    },
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
  },
});
</script>

<style scoped>
.pokemon-details {
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.pokemon-name {
  font-size: 2em;
  margin: 8px 0;
  font-family: var(--kanit);
  font-weight: 800;
  text-transform: capitalize;
  text-align: center;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  margin: 20px auto;
}

.image-container img {
  width: 100%;
  height: auto;
  max-width: 250px;
  object-fit: contain;
}

.pokemon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}

.stats,
.types,
.evolutions {
  margin-bottom: 20px;
  font-family: var(--Nunito);
  font-size: 1.2em;
  text-transform: capitalize;
}

.stats h3,
.types h3,
.evolutions h3 {
  margin: 8px 0;
  font-family: var(--kanit);
  font-weight: 800;
  text-transform: capitalize;
}

.stats ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.stats li {
  font-size: 0.9em;
  margin-bottom: 5px;
}

.stat-item {
  margin-bottom: 15px;
  width: 100%;
}

.stat-label {
  font-size: 0.9em;
  margin-bottom: 5px;
}

.stat-bar-container {
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  height: 20px;
  width: 100%;
}

.stat-bar {
  height: 100%;
  border-radius: 10px;
}

.types {
  margin: 20px auto;
}

.types span {
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.9em;
  font-family: var(--Nunito);
  font-weight: 800;
  color: #fff;
  margin-right: 5px;
}

.type-normal {
  background-color: #a8a77a;
}
.type-fire {
  background-color: #ee8130;
}
.type-water {
  background-color: #6390f0;
}
.type-electric {
  background-color: #f7d02c;
}
.type-grass {
  background-color: #7ac74c;
}
.type-ice {
  background-color: #96d9d6;
}
.type-fighting {
  background-color: #c22e28;
}
.type-poison {
  background-color: #a33ea1;
}
.type-ground {
  background-color: #e2bf65;
}
.type-flying {
  background-color: #a98ff3;
}
.type-psychic {
  background-color: #f95587;
}
.type-bug {
  background-color: #a6b91a;
}
.type-rock {
  background-color: #b6a136;
}
.type-ghost {
  background-color: #735797;
}
.type-dragon {
  background-color: #6f35fc;
}
.type-dark {
  background-color: #705746;
}
.type-steel {
  background-color: #b7b7ce;
}
.type-fairy {
  background-color: #d685ad;
}

.evolution-chain {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.evolution-item {
  text-align: center;
  margin: 10px;
}

.evolution-item img {
  max-width: 100px;
  height: auto;
  margin-bottom: 5px;
}

.evolution-item p {
  font-size: 0.9em;
  font-family: var(--Nunito);
  font-weight: 400;
}

@media (max-width: 600px) {
  .pokemon-name {
    font-size: 1.5em;
  }

  .image-container img {
    width: 90%;
  }

  .evolution-chain {
    display: flex;
    justify-content: center;
  }

  .stats,
  .types,
  .evolutions {
    font-size: 1em;
  }
}
</style>
