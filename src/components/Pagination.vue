<template>
  <nav aria-label="Page navigation" class="pagination-container">
    <button
      class="page-arrow"
      @click.prevent="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      aria-label="Previous Page"
    >
      <i class="fas fa-chevron-left"></i>
    </button>

    <ul class="pagination-list">
      <li
        v-for="page in visiblePages"
        :key="page"
        class="pagination-item"
        :class="{ active: page === currentPage }"
      >
        <button @click.prevent="goToPage(page)" aria-label="Go to page {{ page }}">
          {{ page }}
        </button>
      </li>
      <li v-if="showEllipsis" class="pagination-item">...</li>
    </ul>

    <button
      class="page-arrow"
      @click.prevent="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      aria-label="Next Page"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

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

    const visiblePages = computed(() => {
      const pages = [];
      const range = 2;
      const startPage = Math.max(1, props.currentPage - range);
      const endPage = Math.min(props.totalPages, props.currentPage + range);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    });

    const showEllipsis = computed(() => {
      return (
        visiblePages.value[0] > 1 ||
        visiblePages.value[visiblePages.value.length - 1] < props.totalPages
      );
    });

    return {
      goToPage,
      visiblePages,
      showEllipsis,
    };
  },
});
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.pagination-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 10px;
}

.pagination-item {
  margin: 0 5px;
}

.pagination-item button {
  background: #ffcc00;
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.pagination-item.active button {
  background: #ff9900;
  font-weight: bold;
}

.pagination-item button:hover {
  background-color: #ffcc33;
  transform: scale(1.05);
}

.page-arrow {
  background: #eff18f;
  color: #ffffff;
  cursor: pointer;
  padding: 10px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-arrow:hover {
  background-color: #d2d395;
  transform: scale(1.05);
}

.page-arrow:disabled {
  background: #555555;
  color: #fff;
  cursor: not-allowed;
}

.page-arrow:disabled:hover {
  background: #555555;
}
</style>
