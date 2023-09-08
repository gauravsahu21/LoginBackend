import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ILoginBody } from 'src/common/dto/user.dto';
import { Authorization } from 'src/db/entity/authorization.entity';
import { CollegeInformation } from '../entity/collegeinformation.entity';
import { UserLoginHistory } from '../entity/loginInformation.entity';
import { ProfileType } from 'src/common/models/user.model';
import { findUserFromUserId } from 'src/common/util/user.utility';
import { ImpersonateUser } from '../entity/impersonateUser.entity';
import { Catalogue } from '../entity/catalogue.entity';

@Injectable()
export default class UserRepository {
  async getLoginUser(loginData: ILoginBody) {
    const user = await findUserFromUserId(loginData.userid);

    if (user && bcrypt.compareSync(loginData.password, user.password)) {
      return user;
    } else
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
  }

  async updateLastLogin(profileId: string) {
    const loginHistory: UserLoginHistory = await UserLoginHistory.findOne({
      where: { profileId: profileId },
    });
    if (loginHistory) {
      loginHistory.addLoginTimestamp(new Date());
      await loginHistory.save();
      return;
    }
    const newLoginHistory = new UserLoginHistory();
    newLoginHistory.profileId = profileId;
    newLoginHistory.login_timestamps = [new Date()];
    await newLoginHistory.save();
  }

  async getImpersonatingUser(userid: string, password: string) {
    console.log(userid);
    const user = await Authorization.findOne({ where: { userId: userid } });
    console.log(user);
    if (user && user.profileType !== ProfileType.Impersonate) {
      throw new HttpException('You are not allowed to impersonate', 400);
    }
    if (user && password === user.password) {
      return user;
    } else throw new HttpException('Invalid email or password', 400);
  }
  async getImpersonatedUser(impersonateLoginId: string) {
    const user = await findUserFromUserId(impersonateLoginId);

    console.log('user is :', user);
    if (user && user.profileType === ProfileType.Master) {
      throw new HttpException(
        'You are not allowed to impersonate master user',
        400,
      );
    }
    if (!user) {
      throw new HttpException('User to be impersonate not found', 200);
    }

    return user;
  }

  async changePassword(iChangePassword: any) {
    try {
      let { userId, oldPassword, newPassword } = iChangePassword;
      var user = await findUserFromUserId(userId);
      if (user && bcrypt.compareSync(oldPassword, user.password)) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await Authorization.save(user);
      } else
        throw new HttpException('Old password Not Match', HttpStatus.NOT_FOUND);
    } catch (error) {}
  }

  async addImpersonateLog(
    impersonatingUser: Authorization,
    impersonatedUser: Authorization,
  ) {
    const impersonateUser: ImpersonateUser = new ImpersonateUser();
    impersonateUser.impersonatingUser = impersonatingUser.profileId;
    impersonateUser.impersonatedUser = impersonatedUser.profileId;
    impersonateUser.login_timestamp = new Date();

    await impersonateUser.save();
  }
}
