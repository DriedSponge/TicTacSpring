import { BadRequestException, Body, Controller, Get, Session, HttpException, HttpStatus, Post, Req, Res, UseGuards, Request } from '@nestjs/common';
import {SessionGuard} from "../auth/session.guard";
import { GameService } from './game.service';
@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService){}
@Post("create")
  @UseGuards(SessionGuard)
  getSession(@Request() req, @Res() response) {
    response.status(200).json({ success: true, gameId:1234 });
  }
}
