import { useQuery } from '@tanstack/react-query';
import pokemonApi from '../api/pokemonApi';
import type { PokemonType, NamedAPIResource } from '../interfaces/pokemon';

export const useTypes = () => {
  return useQuery({
    queryKey: ['pokemonTypes'],
    queryFn: async () => {
      const { data } = await pokemonApi.get<{ results: NamedAPIResource[] }>('/type');
      return data.results.filter(type => type.name !== 'unknown' && type.name !== 'shadow');
    },
  });
};

export const useTypeDetail = (typeName: string) => {
  return useQuery({
    queryKey: ['typeDetail', typeName],
    queryFn: async () => {
      const { data } = await pokemonApi.get<PokemonType>(`/type/${typeName}`);
      return data;
    },
    enabled: !!typeName,
  });
};
