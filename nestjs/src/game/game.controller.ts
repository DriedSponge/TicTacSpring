import { BadRequestException, Body, Controller, Get, Session, HttpException, HttpStatus, Post, Req, Res, UseGuards, Request } from '@nestjs/common';
import {SessionGuard} from "../auth/session.guard";
import { GameService } from './game.service';
import {Game } from '@prisma/client';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService){}
@Post("create")
  @UseGuards(SessionGuard)
  async getSession(@Request() req, @Res() response) {
    const game: Game  = await this.gameService.createGame();
    
    response.status(200).json({ success: true, gameId:game.code });
  }
}
