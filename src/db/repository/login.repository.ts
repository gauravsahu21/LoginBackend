/* eslint-disable prettier/prettier */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { ILoginBody, IRegisterBody, MasterChangePassword } from 'src/common/dto/login.dto';
import { Authorization } from 'src/db/entity/authorization.entity';
import { findUserFromUserId } from 'src/common/util/user.utility';
import { generateExceptionMessage } from 'src/common/lib/exceptionMessageGenerator';
import { Certificate } from '../entity/certificates.entity';
import logger from '../../connections/logger/logger';

@Injectable()
export default class UserRepository {
  async getLoginUser(loginData: ILoginBody) {
    try {
      const { userid, password } = loginData;
      const user = await Authorization.createQueryBuilder('user')
        .select([
          'user.userId as userId',
          'user.password as password',
          'user.permissions as permissions',
          'user.brandIds as brandIds',
          'user.profileId as profileId',
          'user.profileType as profileType',
          'user.firstName as firstName',
          'user.lastName as lastName',
          'user.imageId as imageId',
          'user.emailId as emailId',
          'user.s3link as s3link',
          'user.resetPasswordToken as resetPasswordToken ',
          'user.resetPasswordExpire as resetPasswordExpire',
        ])
        .where('user.emailId = :emailId', { emailId: userid })
        .getRawOne();

      

      if (user && bcrypt.compareSync(password, user.password)) {
        console.log("gauravvvvvvvvvvvvv")
        return user;
      } else {
        console.log("asddddddddddddddddavvvvvvvvvvvvv")
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      logger.info('Error occured in getApplicants.Repo');
      logger.error(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async registerUser(loginData: IRegisterBody) {
    try {
      const { userid, password } = loginData;
      const user = new Authorization();
      user.profileId = uuidv4();
      user.emailId = userid;
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      return true;
    } catch (error) {
      logger.info('Error occured in getApplicants.Repo');
      logger.error(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async changePassword(iChangePassword: any) {
    try {
      const { userId, oldPassword, newPassword } = iChangePassword;
      const user = await findUserFromUserId(userId);
      if (user && bcrypt.compareSync(oldPassword, user.password)) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await Authorization.save(user);
      } else {
        throw new Error('Old Password not match');
      }
    } catch (error) {
      logger.info('Error occured in changePassword');
      logger.error(error);
      const message = generateExceptionMessage(
        false,
        {},
        HttpStatus.BAD_REQUEST,
        'Something went wrong while Changeing password',
      );
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  async masterChangePassword(iChangePassword: MasterChangePassword) {
    try {
      const { userId, newPassword } = iChangePassword;
      const user = await Authorization.findOne({ where: { userId: userId } });
      if (user) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await Authorization.save(user);
      }
    } catch (error) {
      logger.info('Error occured in changePassword');
      logger.error(error);
      const message = generateExceptionMessage(
        false,
        {},
        HttpStatus.BAD_REQUEST,
        'Something went wrong while Changeing password',
      );
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
