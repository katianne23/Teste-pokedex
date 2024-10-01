<template>
  <div id="app">
    <header>
      <img
        src="./assets/img/logo.png"
        class="title"
        @click="goHome"
        alt="pokemon"
      />
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; 2024 - Pokédex App</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push({ name: "Home" });
    };

    return { goHome };
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}

header {
  width: 400px;
  margin: 0 auto;
}

.title {
  cursor: pointer;
  max-width: 100%;
  height: auto;
  margin-bottom: 30px;
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

footer {
  text-align: center;
  padding: 10px 0;
  margin-top: 30px;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .title {
    width: 80%;
  }
}

@media (max-width: 480px) {
  .title {
    width: 60%;
  }
}
</style>
