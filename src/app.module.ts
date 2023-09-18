/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { KmpDatabase } from './connections/mysql/kmp.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApiModule, KmpDatabase],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
