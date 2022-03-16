import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameGateway } from './game.gateway';

@Module({
    providers: [ PrismaService, GameGateway],
})
export class GameModule {}
