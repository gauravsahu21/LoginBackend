/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { newpasswordDto } from 'src/common/dto/forget.dto';
import HttpResponse from 'src/common/lib/http-response';
import ForgetPassRepository from 'src/db/repository/forgetpassword.repository';
import logger from '../../connections/logger/logger';

@Injectable()
export class ForgetPassService {
  constructor(private readonly forgetRepo: ForgetPassRepository) {}
  async forget(email: string) {
    try {
      const code = await this.forgetRepo.forget(email);
      if (code) {
        return HttpResponse.success(code, 'Check your email', 200);
      } else {
        return HttpResponse.error(`No user found with this email ${email}`);
      }
    } catch (error) {
      logger.info("Error occured in forget.Service")
      logger.error(error)
      return HttpResponse.error('No user is present with this email');
    }
  }

  async reset(newPassword: newpasswordDto) {
    try {
      // const update = await this.forgetRepo.reset(newPassword);
      // if (update) {
      //   return HttpResponse.success(null, 'Password reset successfully', 200);
      // } else {
      //   return HttpResponse.error(
      //     `No user Id found with this email ${newPassword.email}`,
      //   );
      // }
    } catch (error) {
      logger.info("Error occured in reset.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }
}
