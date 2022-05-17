import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
    providers: [ PrismaService, GameGateway, GameService],
})
export class GameModule {}
