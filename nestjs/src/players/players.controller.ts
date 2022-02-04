import { Controller, Get, Post, Req, Request} from '@nestjs/common';

@Controller('players')
export class PlayersController {

    @Get("/me")
    getSelf() : String {
        return  "You!";
    }

    @Post("/login")
    login() : String {
        return  "You!";
    }
}
