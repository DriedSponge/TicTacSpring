import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer, ValidationError } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    validationError: { target: false, value: false },
    forbidUnknownValues: true,
    skipUndefinedProperties: false,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
    whitelist: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new BadRequestException(validationErrors);
    }
  }));
  app.use(cookieParser());

  const sessionMiddleware = session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 }
  });
  app.use(sessionMiddleware)
  app.useWebSocketAdapter


  //app.use(csurf());
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.enableCors({ origin: ["http://localhost:3000"], credentials: true });
  await app.listen(8080);
}
bootstrap();
