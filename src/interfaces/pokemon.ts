export interface DamageRelations {
  double_damage_from: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  no_damage_to: NamedAPIResource[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonType {
  id: number;
  name: string;
  damage_relations: DamageRelations;
  pokemon: TypePokemon[];
}

export interface TypePokemon {
  pokemon: NamedAPIResource;
  slot: number;
}
