/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import UserService from '../service/login.service';
import { IChangePassword, ILoginBody, IRegisterBody, MasterChangePassword } from 'src/common/dto/login.dto';
import { Request } from 'express';
import { PasswordWriteAccess, WriteAccess } from '../jwt-auth.guard';

@Controller('')
export default class LoginController {
  constructor(private readonly us: UserService) {}

  @Post('/login')
  async loginUser(@Body() body: ILoginBody): Promise<any> {
    return this.us.login(body);
  }

  @Post('/register')
  async registerUser(@Body() body: IRegisterBody): Promise<any> {
    return this.us.register(body);
  }

 

  // @Post('/changepassword')
  // @UseGuards(PasswordWriteAccess)
  // async changePassword(
  //   @Body() iChangePassword: IChangePassword,
  //   @Req() req: Request,
  // ) {
  //   return this.us.changePassword(iChangePassword);
  // }

  // @Post('/masterchangepassword')
  // @UseGuards(PasswordWriteAccess)
  // async masterChangePassword(
  //   @Body() iChangePassword: MasterChangePassword,
  //   @Req() req: Request,
  // ){
  //   return this.us.masterChangePassword(iChangePassword)
  // }
}
