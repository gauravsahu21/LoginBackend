/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Query,Get } from '@nestjs/common';

import { newpasswordDto} from 'src/common/dto/forget.dto';
import { ForgetPassService } from '../service/forgetpassword.service';

@Controller('forgot')
export default class ForgetController {
  constructor(private readonly forgetService: ForgetPassService) {}

  @Get('')
  async forget(@Query('email') email:string): Promise<any>{
    console.log(email,"@#$")
    return this.forgetService.forget(email);
  }
  
  @Post('/reset')
  async reset(@Body() newpassword:newpasswordDto){

   return this.forgetService.reset(newpassword);
  }

  
}
