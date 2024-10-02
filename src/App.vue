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
      <p>Desenvolvido por <a href="https://website-katianne.vercel.app/">Katianne Araújo</a></p>
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

footer p {
  font-size: 0.9em;
  font-family: var(--Nunito);
  color: #000;
}

footer a {
  text-decoration: none;
  color: #000;
  font-weight: 600;
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
