import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService]
})
export class AppModule {}
