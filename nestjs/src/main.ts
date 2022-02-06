import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    validationError:{target:false},
    forbidUnknownValues: true,
    skipUndefinedProperties:true,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
    whitelist: true,
  }));
  await app.listen(8080);
}
bootstrap();
