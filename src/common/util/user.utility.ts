import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv'; 
import { Authorization } from 'src/db/entity/authorization.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

dotenv.config();
//1hr in ms
export const normalExpireTime: number = 3600;

//1hr in ms
const rememberExpireTime: number = 60 * 60 * 24 * 1000;

export const getAccessToken = (loggedInUser) => {
  const object = {
    profileId: loggedInUser.profileid,
    userId: loggedInUser.userId,
    profileType: loggedInUser.profileType,
    impersonated_by: loggedInUser.impersonated_by || null,
  };
  const accessToken = jwt.sign(object, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: normalExpireTime,
  });
  return accessToken;
};

export const userRememberToken = (loggedInUser) => {
  const object = {
    guid: loggedInUser.profileid,
    collegeCode: loggedInUser.college_code,
    specializationCode: loggedInUser.specialization_code,
    profileInformationCode: loggedInUser.profile_information_code,
    profileType: loggedInUser.profiletype,
    userType: loggedInUser.usertype,
    impersonated_by: loggedInUser.impersonated_by || null,
  };
  const refreshToken = jwt.sign(object, process.env.REFRESH_SECRET_TOKEN, {
    expiresIn: rememberExpireTime,
  });
  return refreshToken;
};

export const findUserFromUserId = async (userid: string) => {
  if (userid !== userid.toLowerCase()) {
    throw new HttpException(
      'Invalid email or password',
      HttpStatus.BAD_REQUEST,
    );
  }
  const user = await Authorization.createQueryBuilder('user')
    .select([
      'user.userId as userId',
      'user.password as password',
      'user.profileId as profileId',
      'user.profileType as profileType',
      'user.firstName as firstName',
      'user.lastName as lastName',
      'user.imageId as imageId',
      'user.resetPasswordToken as resetPasswordToken ',
      'user.resetPasswordExpire as resetPasswordExpire',
    ])
    .where('user.userId = :userId', { userId: userid })
    .getRawOne();
  if (user) {
    return user;
  } else {
    throw new HttpException(
      'No user found with this UserId',
      HttpStatus.NOT_FOUND,
    );
  }
};
export const getResetPasswordToken = (): string => {
  //GENERATING TOKEN
  const resetToken: string = crypto.randomBytes(20).toString('hex');

  return resetToken;
};

export const getRefactoredUser = (user: Authorization) => {
  delete user.password;
  delete user.profileId;
  delete user.profileType;
  delete user.userId;

  return user;
};
