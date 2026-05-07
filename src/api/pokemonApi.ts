import axios from 'axios';

const pokemonApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000, // 10 segundos de espera
  headers: {
    'Content-Type': 'application/json',
  },
});

export default pokemonApi;