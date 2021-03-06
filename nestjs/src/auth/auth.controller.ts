import { BadRequestException, Body, Controller, Get, Session, HttpException, HttpStatus, Post, Req, Res, UseGuards, Request } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/CreateUserDto';
import { CreateGuestUserDto } from 'src/user/CreateGuestUserDto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { randomUUID } from 'crypto';
import { SessionGuard } from './session.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService) { }


  @Post('login-guest')
  async guestLogin(@Body() userData: CreateGuestUserDto, @Res() response: Response, @Request() req) {
    userData.uid = randomUUID();
    userData.guest_account = true;
    if (!req.session.name || !req.session.uid) {
      req.session.name = userData.name;
      req.session.uid = userData.uid;
      response.status(201).json({ success: true, user: { name: req.session.name, uid: req.session.uid } })
    } else {
      response.status(200).json({ success: true, user: { name: req.session.name, uid: req.session.uid, gameId: req.session.gameId } })
    }
  }

  @Get("me")
  @UseGuards(SessionGuard)
  getSession(@Request() req, @Res() response) {
    response.status(200).json({ success: true, user: { name: req.session.name, uid: req.session.uid, gameId: req.session.gameId } });
  }

  @Post('logout')
  @UseGuards(SessionGuard)
  logout(@Request() req, @Res() response) {
    req.session.destroy()
    response.status(200).json({ sucess: true })
  }
}
