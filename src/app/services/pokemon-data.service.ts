import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonListItem } from '../models/pokemon-list-item';
import { catchError, of, retry } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  constructor(private http: HttpClient) { }


  baseApiUrl: string = "https://pokeapi.co/api/v2/";
  pokemonList: PokemonListItem[] = [];
  pokemon: Pokemon | undefined;
  listLimit: number = 25;
  listOffset: number = 0;

  getPokemonList(pageNumber: number) {
      this.listLimit = 25;
      this.listOffset = this.listLimit * (pageNumber -1);
    return this.http.get(this.baseApiUrl + "pokemon?limit=" + this.listLimit + "&offset=" + this.listOffset).pipe(retry(1), catchError(error => of('Erreur : impossible de récupérer la liste de Pokemon !')));
  }

  getPokemon(name: string) {
    return this.http.get(this.baseApiUrl + "pokemon/" + name).pipe(retry(1), catchError(error => of('Erreur : impossible de récupérer le Pokemon !')));
  }

}
