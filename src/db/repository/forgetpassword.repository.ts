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
import * as nodemailer from 'nodemailer';
import { Authorization } from 'src/db/entity/authorization.entity';
import { throwError } from 'rxjs';
import { error } from 'console';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';
import { newpasswordDto } from 'src/common/dto/forget.dto';

@Injectable()
export default class ForgetPassRepository {
  async forget(email: string) {
    try {
      console.log('yes', email);
      const user = await Authorization.createQueryBuilder('user')
        .where('user.emailId = :emailId', { emailId: email })
        .getRawOne();

      if (user) {
        console.log('userid is found');
        const code = Math.floor(100000 + Math.random() * 900000);
        const dataToHash = `${process.env.secretCode}${code}`;
        const hash = CryptoJS.SHA256(dataToHash);
        const sixDigitCode = hash.toString().substring(0, 6);
        console.log(sixDigitCode, 'SixDigitCode');

        const transporter = nodemailer.createTransport({
          host: 'smtp.zoho.in',
          port: 587,
          auth: {
            user: 'kampayee@zohomail.in',
            pass: 'gauravkumarsahu',
          },
        });
        console.log('true');
        const info = await transporter.sendMail({
          from: 'kampayee@zohomail.in',
          to: 'gk989kumar@gmail.com',
          subject: 'Reset Code',
          text: `Your Reset Code is ${sixDigitCode}`,
        });

        return code;
      } else {
        
        return false;
      }
    } catch (error) {
      return error;
    }
  }
  async reset(newPassword: newpasswordDto) {
    try {
      const user = await Authorization.createQueryBuilder('user')
        .select(['user.profileId as profileId'])
        .where('user.emailId = :emailId', { emailId: newPassword.email })
        .getRawOne();
      if (user) {
        const newPass = await bcrypt.hash(newPassword.password, 10);
        const update = await Authorization.createQueryBuilder('user')
          .update()
          .set({ password: newPass })
          .where('emailId = :emailId', {
            emailId: newPassword.email,
          })
          .execute();
        if (update.affected == 0) {
          return false;
        }
        return update;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
