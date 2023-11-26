/* eslint-disable prettier/prettier */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { Authorization } from '../entity/authorization.entity';
import { UserDto } from 'src/common/dto/users.dto';
import logger from '../../connections/logger/logger';
@Injectable()
export default class UsersRepository {
  async getUsers() {
    try {
      const users = await Authorization.createQueryBuilder('user')
        .select([
          'user.userId as userId',
          'user.permissions as permissions',
          'user.profileId as profileId',
          'user.profileType as profileType',
          'user.firstName as firstName',
          'user.lastName as lastName',
          'user.brandIds as brandIds',
          'user.emailId as emailId',
          'user.s3link as s3link',
          'user.imageId as imageId',
        ])
        .where('user.profileType NOT IN (:...profileTypes)', {
          profileTypes: ['admin', 'master','intrinsic'],
        })
        .getRawMany();
      return users;
    } catch (error) {
      logger.info('Error occured in getUsers.Repo');
      logger.error(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async addUpdateUser(body: UserDto) {
    try {
      const user = new Authorization();
      user.profileId = body.profileId || uuidv4();
      user.firstName = body.firstName;
      user.lastName = body.lastName;
      user.userId = body.userId;
      user.profileType = body.profileType;
      user.permissions = body.permissions;
      user.emailId = body.emailId;
      user.brandIds = body.brandIds;
      user.s3link = body.s3link;
      user.imageId = body.imageId;
      if (body.password.length > 0) {
        user.password = await bcrypt.hash(body.password, 10);
      }

      await user.save();
      return true;
    } catch (error) {
      logger.info('Error occured in addUpdateUser.Repo');
      logger.error(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async deleteUser(profileId: string) {
    try {
      const user = await Authorization.find({
        where: { profileId: profileId },
      });
      if (user) {
        await Authorization.delete(profileId);
        return true;
      }
    } catch (error) {
      logger.info('Error occured in deleteUser.Repo');
      logger.error(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async getUserById(profileId: string) {
    try {
      const response = await Authorization.findOne({ where: { profileId } });
      if (response) {
        return response;
      }
    } catch (error) {
      logger.info('Error occured in deleteUser.Service');
      logger.error(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

}
