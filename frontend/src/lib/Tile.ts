export class Tile {
    // TO-DO: Clean up.
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

    public toString():string{
        return this.value;
    }
    public static  checkWinner(player:String, state: Tile[][]) : boolean{
        let winningCase:string = `${player}${player}${player}`;
        if(Tile.convertToStringForCheck(Tile.getForwardDiagonal(state)) == winningCase){
            Tile.setWinners(Tile.getForwardDiagonal(state));
            return true;
        }else if(Tile.convertToStringForCheck(Tile.getBackwardDiagonal(state)) == winningCase){
            Tile.setWinners(Tile.getBackwardDiagonal(state));
            return true;
        }else if(this.checkXY(state,winningCase)){
            return true;
        }
        return false;
    }
    private static setWinners(group:Tile[]){
        for(let i =0; i<group.length;i++){
            group[i].winner = true;
        }
    }
    public static  convertToStringForCheck(group:Tile[]):string{
        let result = "";
        for(let i = 0; i<3;i++){
            result+= group[i].value;
        }
        return result;
    }
    static getForwardDiagonal(state:Tile[][]): Tile[]{
        let result: Tile[] = new Array<Tile>();
        for(let i = 0; i<state.length; i++){
            result.push(state[i][i]);
        };
        return result;
    }
    static getBackwardDiagonal(state:Tile[][]): Tile[]{
        let result: Tile[] = new Array<Tile>();
        let j = 0;
        for(let i = state.length-1; i>=0; i--){
            result.push(state[i][j])
            j++
        };
        return result;
    }
    static checkXY(state:Tile[][], winningCase:string){
        let result: string ="";
        for(let i = 0; i<state.length; i++){
            let result: string ="";
            for(let j= 0; j<state[i].length; j++){
                result+=state[i][j].value;
            }
            if(result == winningCase){
                this.setWinners(state[i]);
                return true;
            }
            result ="";
            for(let j= 0; j<state[i].length; j++){
                result+=state[j][i].value;
            }
            if(result == winningCase){
                for(let j= 0; j<state[i].length; j++){
                    state[j][i].winner = true;
                }
                return true;
            }
        };
        return false;
    }
}