import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ValidatorsModule } from './validators/validators.module';
import { GameControllerController } from './game-controller/game-controller.controller';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { GameModule } from './game/game.module';

@Module({
  imports: [AuthModule, UserModule, ValidatorsModule, GameModule],
  controllers: [AppController, GameControllerController, GameController],
  providers: [AppService, PrismaService, UserService, GameService]
})
export class AppModule {}
