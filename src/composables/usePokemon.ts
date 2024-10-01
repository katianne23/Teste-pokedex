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

    const fetchPokemons = async () => {
        const totalPokemons = 1000; 
        const limit = 100; 
        const requests = []; 

        for (let offset = 0; offset < totalPokemons; offset += limit) {
            requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`));
        }

        try {
            const responses = await Promise.all(requests); 
            const pokemonPromises = responses.flatMap(response => 
                response.data.results.map(async (pokemon: any) => {
                    const detailsResponse = await axios.get(pokemon.url);
                    return {
                        id: detailsResponse.data.id,
                        name: detailsResponse.data.name,
                        sprites: detailsResponse.data.sprites,
                        types: detailsResponse.data.types.map((t: any) => t.type.name),
                    };
                })
            );

            pokemons.value = await Promise.all(pokemonPromises); 
        } catch (error) {
            console.error("Erro ao carregar os Pokémon:", error);
        }
    };

    return { pokemons, fetchPokemons };
};
