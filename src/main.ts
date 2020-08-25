import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setDefaultValues } from './database/data/create';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './config/config.swagger';
import { json, urlencoded } from 'express';

dotenv.config();
async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  setDefaultValues();
  app.enableCors();
  // if (process.env.NODE_ENV === 'development') {
  //   app.enableCors();
  // } else {
  // app.enableCors({ origin: serverConfig.origin });
  // logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
  // }
  await app.listen(AppModule.port, '0.0.0.0');
  logger.log(`Application listening on port ${AppModule.port}`);
}
bootstrap();
