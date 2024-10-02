<template>
  <div id="app">
    <header>
      <img
        src="./assets/img/logo.png"
        class="title"
        @click="goHome"
        alt="pokemon"
      />
      <nav>
        <router-link to="/"  class="link"><i class="fa-solid fa-house"></i> Home</router-link>
        <router-link to="/favorites"  class="link"><i class="fa-solid fa-star"></i>
          Favoritos</router-link>
      </nav>
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

nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
}
.link {
  font-size: 1.3em;
  margin: 8px 0;
  font-family: var(--kanit);
  font-weight: 800;
  color: #000;
}

.house {
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40px;
  height: 40px;
  background-color: #8B4513; /* Cor da casa */
  border: 2px solid #000;
  box-sizing: border-box;
}

.house:before {
  content: "";
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 22px solid transparent;
  border-right: 22px solid transparent;
  border-bottom: 25px solid #8B4513; /* Telhado */
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
