<template>
  <div class="filter-container">
    <label for="type" class="filter-label">Filtrar por tipo:</label>
    <select @change="onTypeChange" id="type" class="styled-select">
      <option value="">Todos</option>
      <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["filter"],
  data() {
    return {
      types: [
        "normal",
        "fire",
        "water",
        "grass",
        "electric",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "steel",
        "fairy",
      ],
    };
  },
  methods: {
    onTypeChange(event: Event) {
      const selectedType = (event.target as HTMLSelectElement).value;
      this.$emit("filter", selectedType);
    },
  },
});
</script>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
}

.filter-label {
  font-size: 1.2em;
  margin-right: 15px;
  font-family: var(--kanit);
  font-weight: 400;
  text-transform: capitalize;
}

.styled-select {
  padding: 10px 15px;
  border-radius: 100px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 1em;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.styled-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.styled-select option {
  padding: 10px;
  font-family: var(--Nunito);
  text-transform: capitalize;
}
</style>
