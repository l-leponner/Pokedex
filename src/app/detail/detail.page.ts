import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDataService } from '../services/pokemon-data.service';
import { Pokemon } from '../models/pokemon';
import { PokemonMove } from '../models/pokemon-move';
import { PokemonAbility } from '../models/pokemon-ability';
import { PokemonStat } from '../models/pokemon-stat';
import { typeColorAssociation } from '../theme/type-color-association';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private pokemonDataService: PokemonDataService
    ) { }

  pokemonName: string = '';
  pokemon: Pokemon | undefined;
  abilitiesCount: number = 0;

  ngOnInit() {
    console.log("ngOnInit")
    this.pokemonName = this.activatedRoute.snapshot.params['name'];
    this.getPokemon(this.pokemonName);
    
  }

  ionViewDidEnter(){
    console.log("ionViewWillEnter")
    this.paintBackground();
  }

  getPokemon(pokemonName: string) {
    console.log('getPokemon')
    this.pokemonDataService.getPokemon(pokemonName).subscribe({
      next: (result: any) => {
        if(result) {
          let moves: PokemonMove[] = []; 
          result.moves.forEach((element: any) => {
            moves.push({name: element.move.name, url: element.move.url, id: parseInt(this.extractId(element.move.url))});
          });
          let abilities: PokemonAbility[] = []; 
          result.abilities.forEach((element: any) => {
            abilities.push({name: element.ability.name, url: element.ability.url, id: parseInt(this.extractId(element.ability.url)), isHidden: element.is_hidden, slot: element.slot});
          });
          let stats: PokemonStat[] = []; 
          result.stats.forEach((element: any) => {
            stats.push({name: element.stat.name, url: element.stat.url, id: parseInt(this.extractId(element.stat.url)), baseStat: element.base_stat, effort: element.effort});
          });
          let types: string[] = []; 
          result.types.forEach((element: any) => {
            types.push(element.type.name);
          });

          this.pokemon = new Pokemon(abilities, moves, result.species, result.sprites, stats, types, result.baseExperience, result.height, result.id, result.name, result.order, result.weight);
            // this.pokemon = {
            //   name: result.name, 
            //   weight: result.weight, 
            //   id: result.id, 
            //   baseExperience: result.base_experience, 
            //   height: result.height,
            //   abilities: abilities,
            //   order: result.order,
            //   species: result.species,
            //   sprites: result.sprites,
            //   stats: stats,
            //   types: types,
            //   moves: moves
            // };
            console.log(this.pokemon)
            this.abilitiesCount = this.pokemon.abilities.length;
        }
      }, error: (error) => {
        console.log(error);
      }
      });
  }

  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }

  paintBackground(){
    if(this.pokemon) {
      const colors: string[] = [];
      for(let type of this.pokemon.types) {
        colors.push(typeColorAssociation[type]);
      }
      console.log(colors[0])
      console.log(colors[1])
      const color1 = colors[0];
      const backgroundElement = document.getElementById("pokemon-detail-content");
      document.getElementById("pokemon-detail-content")!.style.backgroundColor = colors[0];
      if(colors.length > 1) {
        const color2= colors[1];
        const gradientStyle = `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`;
        backgroundElement!.style.background = gradientStyle;
      } 
      
    }
    
  }
}
