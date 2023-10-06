import { PokemonAbility } from "./pokemon-ability";
import { PokemonMove } from "./pokemon-move";
import { PokemonStat } from "./pokemon-stat";

export class Pokemon {
    abilities: PokemonAbility[];
    // forms: string[];
    // held_items: string[];
    moves: PokemonMove[];
    species: string[];
    sprites: string[];
    stats: PokemonStat[];
    types: string[];
    baseExperience: number;
    height: number;
    id: number;
    name: string;
    order: number;
    weight: number;

    constructor(abilities: PokemonAbility[],
        // held_items: string[],
        moves: PokemonMove[],
        species: string[],
        sprites: string[],
        stats: PokemonStat[],
        types: string[],
        baseExperience: number,
        height: number,
        id: number,
        name: string,
        order: number,
        weight: number,){
            this.abilities = abilities;
            // held_items: string[];
            this.moves = moves;
            this.species = species;
            this.sprites = sprites;
            this.stats = stats;
            this.types = types;
            this.baseExperience = baseExperience;
            this.height = height;
            this.id = id;
            this.name = name;
            this.order = order;
            this.weight = weight;
    }
}