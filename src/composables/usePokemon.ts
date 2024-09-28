import { ref, Ref } from 'vue';
import axios from 'axios';

interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
}

export const usePokemon = () => {
    const pokemons: Ref<Pokemon[]> = ref([]);

    const fetchPokemons = async (page: number) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
            const pokemonPromises = response.data.results.map(async (pokemon: any) => {
                const detailsResponse = await axios.get(pokemon.url);
                return {
                    id: detailsResponse.data.id,
                    name: detailsResponse.data.name,
                    sprites: detailsResponse.data.sprites
                };
            });

            pokemons.value = await Promise.all(pokemonPromises);
        } catch (error) {
            console.error("Erro ao carregar os Pokémon:", error);
        }
    };

    return { pokemons, fetchPokemons };
};
