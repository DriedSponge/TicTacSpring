import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards, Request } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/CreateUserDto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private authService: AuthService) {}


    @Post("register")
    async register(@Body() userData: CreateUserDto) {
        const salt = await bcrypt.genSalt();
        userData.password = await bcrypt.hash(userData.password,10);
        return this.userService.createUser({data:userData});
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {
      return this.authService.login(req.user);;
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
