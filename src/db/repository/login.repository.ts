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

import { ILoginBody } from 'src/common/dto/login.dto';
import { Authorization } from 'src/db/entity/authorization.entity';
import { findUserFromUserId } from 'src/common/util/user.utility';
import { generateExceptionMessage } from 'src/common/lib/exceptionMessageGenerator';
import { Certificate } from '../entity/certificates.entity';

@Injectable()
export default class UserRepository {
  async getLoginUser(loginData: ILoginBody) {
    const { userid, password } = loginData;
    const user = await findUserFromUserId(userid);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    } else
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
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
