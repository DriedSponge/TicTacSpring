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

    static checkHoz(state:Tile[]){
        for(let i=0;i<3; i++){
            console.log(state[i].value)
        }
        for(let i=3;i<6; i++){
            console.log(state[i].value)
        }
        for(let i=6;i<9; i++){
            console.log(state[i].value)
        }
    }
}