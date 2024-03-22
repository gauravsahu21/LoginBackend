/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  IChangePassword,
  ILoginBody,
  IRegisterBody,
  MasterChangePassword,
} from 'src/common/dto/login.dto';
import HttpResponse from 'src/common/lib/http-response';
import UserRepository from 'src/db/repository/login.repository';
import {
  getAccessToken,
  getRefactoredUser,
  normalExpireTime,
} from 'src/common/util/user.utility';
import * as dotenv from 'dotenv';
import logger from '../../connections/logger/logger';

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
      logger.info(`${loginData} user logged In`);
      return HttpResponse.success(
        { ...refactoredUser, accessToken, expiresOn },
        'Logged In succesfully',
        200,
      );
    } catch (error) {
      logger.info('Error occured in login.Service');
      logger.error(error);
      return HttpResponse.error("Check you password", {
        errorData: error,
        errorCode: error.status,
        httpCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
  async register(loginData: IRegisterBody) {
    try {
      const user = await this.userRepository.registerUser(loginData);

      // return HttpResponse.success(
      //   'New User Register succesfully',
      //   200,
      // );
      return HttpResponse.success(
        {},
        'New User Register succesfully',
        200,
      );
    } catch (error) {
      logger.info('Error occured in login.Service');
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
      logger.info('Error occured in changePassword');
      logger.error(error);
      return HttpResponse.error(error.message);
    }
  }

  async masterChangePassword(iChangePassword: MasterChangePassword) {
    try {
      const response = await this.userRepository.masterChangePassword(
        iChangePassword,
      );
      return HttpResponse.success(
        { response },
        'Admin Changed password is updated succesfully',
        200,
      );
    } catch (error) {
      logger.info('Error occured in changePassword');
      logger.error(error);
      return HttpResponse.error(error.message);
    }
  }
}
