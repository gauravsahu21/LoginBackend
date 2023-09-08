import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  IChangePassword,
  IImpersonateLoginBody,
  ILoginBody,
} from 'src/common/dto/user.dto';
import { Authorization } from 'src/db/entity/authorization.entity';
import HttpResponse from 'src/common/lib/http-response';
import UserRepository from 'src/db/repository/user.repository';
import {
  findUserFromUserId,
  getAccessToken,
  getRefactoredUser,
  getResetPasswordToken,
  normalExpireTime,
  userRememberToken,
} from 'src/common/util/user.utility';
import logger from 'src/common/logger/loggerconnection';
import { sendResetPasswordEmail } from 'src/common/util/mailsender.utility';
import { ProfileBasic } from 'src/db/entity/profilebasic.entity';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(loginData: ILoginBody) {
    try {
      const user = await this.userRepository.getLoginUser(loginData);

      // await this.userRepository.updateLastLogin(user.profileid);
      const accessToken: string = getAccessToken(user);
      const expiresOn = new Date().getTime() + normalExpireTime;
      const refactoredUser = getRefactoredUser(user);
      return HttpResponse.success(
        { ...refactoredUser, accessToken, expiresOn },
        'Logged In succesfully',
        200,
      );
    } catch (error) {
      console.log(error);
      logger.error(error);

      return HttpResponse.error(error.message, {
        errorData: error,
        errorCode: error.status,
        httpCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async forgotPassword(userid: string, req: Request) {
    try {
      var resetUser: Authorization | null = await Authorization.findOne({
        where: { userId: userid },
      });
      if (!resetUser) {
        throw new HttpException('invalid user id', HttpStatus.NOT_FOUND);
      }
      var user = await findUserFromUserId(userid);
      const resetToken: string = getResetPasswordToken();
      resetUser.resetPasswordToken = resetToken;
      resetUser.resetPasswordExpire = String(Date.now() + 15 * 60 * 1000);
      await resetUser.save();
      console.log(resetToken);
      const userProfile = await ProfileBasic.findOne({
        where: { profile_id: user.profileid },
      });
      await sendResetPasswordEmail(resetToken, userProfile.email, req);
      const message = `Check your Email ${userProfile.email} for further instruction `;
      //remove this RESETTOKEN from httpresponse.success after integration of rabbitmq for sending email
      return HttpResponse.success(resetToken, message);
    } catch (error) {
      if (resetUser) {
        resetUser.resetPasswordToken = null;
        resetUser.resetPasswordExpire = null;
        await resetUser.save();
      }
      logger.error(error);

      return HttpResponse.error(error.message, {
        errorData: error,
        errorCode: error.status,
        httpCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async changePassword(iChangePassword: IChangePassword) {
    try {
      const response = await this.userRepository.changePassword(
        iChangePassword,
      );
      return HttpResponse.success(
        { response },
        'Changed password is updated succesfully',
        200,
      );
    } catch (error) {
      return HttpResponse.error(error.message, {
        errorData: error,
        errorCode: error.status,
        httpCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
