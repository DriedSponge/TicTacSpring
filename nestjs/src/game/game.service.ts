import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, PrismaClient, Game } from '@prisma/client';

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService) {}

    async createGame(): Promise<Game>{
        return this.prisma.game.create({data:{code:1111}});
    }

}
