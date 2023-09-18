import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CareersService } from '../service/careers.service';
import { CareerEntity } from 'src/db/entity/careers.entity';
import { CareerDto } from 'src/common/dto/careers.dto';
import { WriteAccess } from '../jwt-auth.guard';

@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Get()
  async getAllCareers() {
    return this.careersService.getAllCareers();
  }

  @Post()
  @UseGuards(WriteAccess)
  async createCareer(@Body() createCareerDto: CareerDto) {
    return this.careersService.createCareer(createCareerDto);
  }

  @Delete(':careerId')
  @UseGuards(WriteAccess)
  async deleteCareer(@Param('careerId') careerId: string) {
    return this.careersService.deleteCareer(careerId);
  }
}