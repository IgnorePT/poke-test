export type PokemonSpecies = {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonResults[];
};

export type PokemonResults = {
  name: string;
  url: string;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type Sprites = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type Pokemon = {
  height: number;
  id: number;
  is_default: boolean;
  name: string;
  order: number;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
};
