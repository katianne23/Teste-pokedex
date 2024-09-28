import { ref } from "vue";
import axios, { AxiosResponse } from "axios";

interface Pokemon {
    name: string;
    url: string;
}

interface PokemonResponse {
    count: number;
    results: Pokemon[];
}

interface TypeResponse {
    pokemon: { pokemon: Pokemon }[];
}

export function usePokemon() {
    const pokemons = ref<Pokemon[]>([]);
    const totalPages = ref<number>(0);
    const baseUrl = 'https://pokeapi.co/api/v2';

    const fetchPokemons = async (page: number = 1) => {
        const response: AxiosResponse<PokemonResponse> = await axios.get(`${baseUrl}/pokemon?limit=20&offset=${(page - 1) * 20}`);
        pokemons.value = response.data.results;
        totalPages.value = Math.ceil(response.data.count / 20);
    };


    const searchPokemon = async (query: string) => {
        const response: AxiosResponse<any> = await axios.get(`${baseUrl}/pokemon/${query.toLowerCase()}`);
        pokemons.value = [response.data];
    };


    const filterByType = async (type: string) => {
        const response: AxiosResponse<TypeResponse> = await axios.get(`${baseUrl}/type/${type}`);
        pokemons.value = response.data.pokemon.map((p) => p.pokemon);
    };

    return { pokemons, fetchPokemons, searchPokemon, filterByType, totalPages };
}
