import { Controller, Get, Req, Request } from '@nestjs/common';
import { Session } from 'express-session';

@Controller('players')
export class PlayersController {

    @Get("/me")
    getSelf(@Req() request: Request) : String {
        return "You!";
    }
}
