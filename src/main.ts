import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import chalk from 'chalk';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { mw } from 'request-ip';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import AppConfig, { Env } from './config';

async function bootstrap() {
  const { port } = AppConfig.app;

  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(mw({ attributeName: 'ip' }));
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  await app.listen(port).then(() => {
    Logger.log(
      `${chalk.yellow('[NestApplication]')} ${chalk.green(
        `env: ${Env}. nest-starter is running at port ${AppConfig.app.port}`,
      )}`,
    );
  });
}

bootstrap();
