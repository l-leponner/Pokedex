export class PokemonStat {
    id: number;
    name: string;
    url: string;
    baseStat: number;
    effort: number;
    
    constructor(id: number, 
        name: string,
        url: string,
        baseStat: number,
        effort: number){
            this.id = id;
            this.name = name;
            this.url = url;
            this.baseStat = baseStat;
            this.effort = effort;
    }
}