export class Tile {
    value: string;
    winner: boolean = false;
    constructor(value: string) {
        this.value = value
    }
    setValue(value: string) {
        this.value = value;
    };
    getValue(): string { return this.value }

    setWinner(isWinner:boolean){
        this.winner = isWinner;
    }
    getWinner():boolean{return this.winner}
    toggleWinner(){this.winner = !this.winner}

    static checkForWinenr(){

    }
}