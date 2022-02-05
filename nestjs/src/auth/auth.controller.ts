import { Body, Controller, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        ) {}


    @Post("register")
    async register(@Body() userData: { name: string; password: string; email: string }) {
        if(userData.email == null || userData.name == null || userData.password == null){
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return this.userService.createUser({data:userData});
    }
}
