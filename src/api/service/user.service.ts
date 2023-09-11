import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IChangePassword, ILoginBody, AddOrEditCertificate } from 'src/common/dto/user.dto';
import HttpResponse from 'src/common/lib/http-response';
import UserRepository from 'src/db/repository/user.repository';
import {
  getAccessToken,
  getRefactoredUser,
  normalExpireTime,
} from 'src/common/util/user.utility';
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
      return HttpResponse.error(error.message);
    }
  }
}
