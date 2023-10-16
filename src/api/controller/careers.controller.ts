/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CareersService } from '../service/careers.service';
import { CareerEntity } from 'src/db/entity/careers.entity';
import { CareerDto } from 'src/common/dto/careers.dto';
import { PermissionsAuthGuard, WriteAccess } from '../jwt-auth.guard';

@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Get()
  @UseGuards(PermissionsAuthGuard)
  async getAllCareers() {
    return this.careersService.getAllCareers();
  }

  @Post()
  @UseGuards(PermissionsAuthGuard)
  async createCareer(@Body() createCareerDto: CareerDto) {
    return this.careersService.createCareer(createCareerDto);
  }

  @Delete(':careerId')
  @UseGuards(PermissionsAuthGuard)
  async deleteCareer(@Param('careerId') careerId: string) {
    return this.careersService.deleteCareer(careerId);
  }
}