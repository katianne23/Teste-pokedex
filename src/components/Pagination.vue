<template>
  <nav aria-label="Page navigation" class="pagination-container">
    <button
      class="page-arrow"
      @click.prevent="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      <i class="fas fa-chevron-left"></i>
    </button>

    <transition name="slide">
      <span v-if="currentPage" key="current">{{ currentPage }}</span>
    </transition>

    <button
      class="page-arrow"
      @click.prevent="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    onPageChange: {
      type: Function as PropType<(page: number) => void>,
      required: true,
    },
  },
  setup(props) {
    const goToPage = (page: number) => {
      if (page > 0 && page <= props.totalPages) {
        props.onPageChange(page);
      }
    };

    return {
      goToPage,
    };
  },
});
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-arrow {
  background: none;
  cursor: pointer;
  padding: 10px;
  font-size: 1.5em;
  border: 2px solid #007bff;
  border-radius: 50%;
  color: #000000;
  transition: background-color 0.3s, color 0.3s;
  margin: 0 5px;
}

.page-arrow:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.page-arrow:disabled {
  color: #ccc;
  cursor: not-allowed;
  border-color: #ccc;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(20px); 
}

</style>
