import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setDefaultValues } from './database/data/create';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  setDefaultValues();
  app.enableCors();
  // if (process.env.NODE_ENV === 'development') {
  //   app.enableCors();
  // } else {
  // app.enableCors({ origin: serverConfig.origin });
  // logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
  // }
  await app.listen(AppModule.port);
  logger.log(`Application listening on port ${AppModule.port}`);
}
bootstrap();
