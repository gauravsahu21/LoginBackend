import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import logger from './common/logger/loggerconnection';
import * as config from './config/config.json'
import { GlobalExceptionFilter } from './common/lib/exception-filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  await app.listen(config.APP_PORT || 3000);
}
bootstrap();
