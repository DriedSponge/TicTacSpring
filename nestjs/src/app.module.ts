import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ValidatorsModule } from './validators/validators.module';

@Module({
  imports: [AuthModule, UserModule, ValidatorsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService]
})
export class AppModule {}
