import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppDataSource } from '../data-source';
import { AppModule } from './app/app.module';

async function bootstrap() {
  await AppDataSource.initialize()
    .then(() => {
      Logger.log('Data Source has been initialized!');
    })
    .catch((err) => {
      Logger.error('Error during Data Source initialization', err);
      process.exit(1);
    });

  const app = await NestFactory.create(AppModule, { cors: true });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3001;
  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
