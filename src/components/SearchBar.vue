 <template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchTerm"
      @input="onInput"
      placeholder="Pesquise por nome ou número"
      class="search-input"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["search"],
  setup(_, { emit }) {
    const searchTerm = ref("");
    

    const onInput = () => {
      emit("search", searchTerm.value);
    };

    return {
      searchTerm,
      onInput,
    };
  },
});
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 300px;
  padding: 12px 20px;
  border-radius: 25px;
  border: 1px solid #ccc;
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: border 0.3s ease, box-shadow 0.3s ease;
  font-size: 16px;
}

.search-input:focus {
  border: 1px solid #007bff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
}

.search-input::placeholder {
  color: #999;
  opacity: 1;
  transition: color 0.3s ease;
}

.search-input:focus::placeholder {
  color: #bbb;
}
</style>
