import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import PokemonDetails from "../pages/PokemonDetails.vue";
import FavoritePokemons from "../pages/FavoritePokemons.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage
    },
    {
        path: "/pokemon/:id",
        name: 'PokemonDetails',
        component: PokemonDetails,
        props: true,
    },
    {
        path: "/favorites",
        name: "Favorites",
        component: FavoritePokemons,
        props: true,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
