<template>
    <div id="app">
      <header>
        <h1 class="title">Pokédex</h1>
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
  export default {
    name: "App",
  };
  </script>
  
  <style scoped></style>
  
