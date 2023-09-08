import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ILoginBody } from 'src/common/dto/user.dto';
import { Authorization } from 'src/db/entity/authorization.entity';
import { findUserFromUserId } from 'src/common/util/user.utility';

@Injectable()
export default class UserRepository {
  async getLoginUser(loginData: ILoginBody) {
    const user = await findUserFromUserId(loginData.userid);

    if (user) {
      return user;
    } else
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
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
}
