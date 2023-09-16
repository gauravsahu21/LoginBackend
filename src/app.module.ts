/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { KmpDatabase } from './connections/mysql/kmp.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import s3Config from './config/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [s3Config],
    }),
    ApiModule,
    KmpDatabase,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
