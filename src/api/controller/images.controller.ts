/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { ImagesService } from '../service/images.service';
import { ImagesDto } from '../../common/dto/images.dto';
import { PermissionsAuthGuard, WriteAccess } from '../jwt-auth.guard';

@Controller('images')
export default class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Get('/')
  @UseGuards(PermissionsAuthGuard)
  async getImages(@Request() request: any): Promise<any> {
    return this.imagesService.getImages();
  }

  @Post('/')
  @UseGuards(PermissionsAuthGuard)
  async addImages(@Body() body: ImagesDto): Promise<any> {
    return this.imagesService.addImages(body);
  }
}
