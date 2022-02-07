import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailInUse, UserNameInUse } from 'src/validators/UserValidators';

@Module({
  providers: [AuthService, UserService,PrismaService, EmailInUse, UserNameInUse],
  controllers: [AuthController]
})
export class AuthModule {}
