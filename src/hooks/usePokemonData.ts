import { useQuery, useQueries } from '@tanstack/react-query';
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

export const useCombinedEffectiveness = (typeNames: string[]) => {
  const typeQueries = useQueries({
    queries: typeNames.map(name => ({
      queryKey: ['typeDetail', name],
      queryFn: async () => {
        const { data } = await pokemonApi.get<PokemonType>(`/type/${name}`);
        return data;
      },
    })),
  });

  const isLoading = typeQueries.some(q => q.isLoading);
  const isError = typeQueries.some(q => q.isError);

  const calculateEffectiveness = () => {
    if (isLoading || isError || typeQueries.length === 0) return null;

    const effectiveness: Record<string, number> = {};
    
    typeQueries.forEach(query => {
      const data = query.data;
      if (!data) return;

      data.damage_relations.double_damage_from.forEach(t => {
        effectiveness[t.name] = (effectiveness[t.name] ?? 1) * 2;
      });
      data.damage_relations.half_damage_from.forEach(t => {
        effectiveness[t.name] = (effectiveness[t.name] ?? 1) * 0.5;
      });
      data.damage_relations.no_damage_from.forEach(t => {
        effectiveness[t.name] = 0;
      });
    });

    return effectiveness;
  };

  return {
    effectiveness: calculateEffectiveness(),
    isLoading,
    isError,
  };
};
