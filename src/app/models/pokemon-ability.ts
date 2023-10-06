export class PokemonAbility {
    id: number;
    name: string;
    url: string;
    isHidden: boolean;
    slot: number;
    
    constructor(id: number, 
        name: string,
        url: string,
        isHidden: boolean,
        slot: number){
            this.id = id;
            this.name = name;
            this.url = url;
            this.isHidden = isHidden;
            this.slot = slot;
    }
}