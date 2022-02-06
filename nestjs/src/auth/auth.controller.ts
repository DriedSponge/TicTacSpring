import { Body, Controller, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/CreateUserDto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        ) {}


    @Post("register")
    async register(@Body() userData: CreateUserDto) {
        return this.userService.createUser({data:userData});
    }
}
