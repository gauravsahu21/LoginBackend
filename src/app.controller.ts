import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards()
  findAll() {
    return this.appService.getTest();
  }
}
