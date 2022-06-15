import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, PrismaClient, Game } from '@prisma/client';

@Injectable()
export class GameService {
    constructor(public prisma: PrismaService) {}

    async createGame(creator: string): Promise<Game>{
        let code:string = Math.floor(10000 + Math.random() * 90000).toString();
        let found: boolean = false;
        while(!found){
            try {
                console.debug("Looking for code dupe...")
                await this.getGameByCode(code)
                console.debug("Dupe found, trying a new code...")
                Math.floor(10000 + Math.random() * 90000)
            }catch{
                found = true
                console.debug("Code dupe not found. Creating game instance!")
                return this.prisma.game.create({data:{code:code,x:creator}});
            }
        }
        
    }

    async getGameByCode(code: string): Promise<Game>{
        return this.prisma.game.findFirst({
            where:{
                code:code
            },
            rejectOnNotFound: true
        })
    }

    async deleteGameByCode(code:string){
        console.debug("Deleting game: "+code)
        try{
            await this.prisma.game.delete({where:{code:code}})
        }catch{
            console.debug("Game to delete is already gone :).")
        }
    }

}
