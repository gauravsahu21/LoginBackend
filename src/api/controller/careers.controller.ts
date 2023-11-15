/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { CareersService } from '../service/careers.service';
import { CareerEntity } from 'src/db/entity/careers.entity';
import { CareerDto } from 'src/common/dto/careers.dto';
import { PermissionsAuthGuard, WriteAccess } from '../jwt-auth.guard';
import { parse } from 'path/posix';

@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Get('/')
  async getAllCareers() {
    console.log('dasdasd')
    return this.careersService.getAllCareers();
  }

  @Post()
  @UseGuards(PermissionsAuthGuard)
  async createCareer(@Body() createCareerDto: CareerDto) {
    return this.careersService.createCareer(createCareerDto);
  }

  @Delete('/')
  @UseGuards(PermissionsAuthGuard)
  async deleteCareer(@Query() query: any) { 
    return this.careersService.deleteCareer(query.careersId);
  }

  @Get('/Id/')
  async getCareersById(@Query() query: any): Promise<any> {
    return this.careersService.getCareersById(query.careerId);
  }
}