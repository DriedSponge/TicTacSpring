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

    static checkForwardDiagonal(state:Tile[][]){
        let result: string ="";
        for(let i = 0; i<state.length; i++){
            result+= state[i][i].value
        };
        console.log(result);
        return result;
    }
    static checkBackwardDiagonal(state:Tile[][]){
        let result: string ="";
        let j = 0;
        for(let i = state.length-1; i>=0; i--){
            result+= state[i][j].value
            j++
        };
        console.log(result);
        return result;
    }
}