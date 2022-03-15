import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, PrismaClient, Game } from '@prisma/client';

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService) {}

    async createGame(): Promise<Game>{
        let code:number = Math.floor(10000 + Math.random() * 90000);
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
                return this.prisma.game.create({data:{code:code}});
            }
        }
        
    }

    async getGameByCode(code: number): Promise<Game>{
        return this.prisma.game.findFirst({
            where:{
                code:code
            },
            rejectOnNotFound: true
        })
    }

}
