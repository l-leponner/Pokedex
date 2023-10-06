import { Component, OnInit } from '@angular/core';
import { PokemonListItem } from '../models/pokemon-list-item';
import { PokemonDataService } from '../services/pokemon-data.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(private pokemonDataService: PokemonDataService) { }

  pokemonList: PokemonListItem[] = [];
  pageNumber: number = 1;

  ngOnInit() {
    this.getPokemonList(this.pageNumber);
  }

  getPokemonList(pageNumber: number) {
    this.pokemonDataService.getPokemonList(pageNumber).subscribe({
      next: (result: any) => {
        if(result && result.results.length > 0) {
          result.results.forEach((element: any) => {
            this.pokemonList.push({name: element.name, url: element.url, id: parseInt(this.extractPokemonId(element.url))});
          });
        }
      }, error: (error) => {
        console.log(error);
      }
      });
  }


  extractPokemonId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }

  onIonInfinite(ev: any) {
    this.pageNumber++;
    this.getPokemonList(this.pageNumber);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
