import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonSpecies } from '../dtos/pokemon/pokemon-dto';
import { ApiService } from './api.service';

@Injectable()
export class PokemonService {
  constructor(protected api: ApiService) {}

  baseurl = 'https://pokeapi.co/api/v2';

  getPokemons(): Observable<PokemonSpecies> {
    const resource = '/pokemon-species';
    return this.api.get(`${this.baseurl}${resource}`);
  }

  getPokemonDetail(pokemonName: string): Observable<any> {
    const resource = `/pokemon/${pokemonName.toLowerCase()}`;
    return this.api.get(`${this.baseurl}${resource}`);
  }
}
