/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Query, Delete, UseGuards,Get } from '@nestjs/common';
import {UsersService} from '../service/users.service';
import { PermissionsAuthGuard, WriteAccess } from '../jwt-auth.guard';
import { UserDto } from 'src/common/dto/users.dto';


@Controller('users')

export default class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  @Get('/')
  @UseGuards(PermissionsAuthGuard)
  async getUsers(): Promise<any> {
    return this.UsersService.getUsers();
  }
  @Post('/')
  @UseGuards(PermissionsAuthGuard)
  async addUpdateUser(@Body() body:UserDto): Promise<any> {
    return this.UsersService.addUpdateUser(body);
  }
  @Delete('/')
  @UseGuards(PermissionsAuthGuard)
  async deleteUser(@Query() query:any): Promise<any> {
    return this.UsersService.deleteUser(query.profileId);
  }
}
