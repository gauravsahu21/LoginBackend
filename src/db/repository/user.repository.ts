import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { ILoginBody, AddOrEditCertificate } from 'src/common/dto/user.dto';
import { Authorization } from 'src/db/entity/authorization.entity';
import { findUserFromUserId } from 'src/common/util/user.utility';
import { generateExceptionMessage } from 'src/common/lib/exceptionMessageGenerator';
import { Certificate } from '../entity/certificates.entity';

@Injectable()
export default class UserRepository {
  async getLoginUser(loginData: ILoginBody) {
    let {userid,password} = loginData;
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
      let { userId, oldPassword, newPassword } = iChangePassword;
      var user = await findUserFromUserId(userId);
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

  async getCertificates() {
    try {
      const response = await Certificate.find();
      return response;
    } catch (error) {
      const message = generateExceptionMessage(
        false,
        {},
        HttpStatus.BAD_REQUEST,
        'Something went wrong while Fetching Certificates',
      );
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  async addCertificates(addOrEditCertificates: AddOrEditCertificate) {
    try {
      let { certificatesId, imageId, certificateName, certificateType } =
        addOrEditCertificates;
      const certificateToUpdate = await Certificate.findOne({
        where: { certificatesId: certificatesId },
      });
      if (certificateToUpdate && certificatesId) {
        certificateToUpdate.imageId = imageId;
        certificateToUpdate.certificateName = certificateName;
        certificateToUpdate.certificateType = certificateType;
        await Certificate.save(certificateToUpdate);
      } else {
        let certificate = new Certificate();
        certificate.certificatesId = uuidv4();
        certificate.imageId = imageId;
        certificate.certificateName = certificateName;
        certificate.certificateType = certificateType;
        await Certificate.save(certificate);
      }
    } catch (error) {
      const message = generateExceptionMessage(
        false,
        {},
        HttpStatus.BAD_REQUEST,
        'Something went wrong while Add or Update Certificates',
      );
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCertificates(id: string) {
    try {
      const certificate = await Certificate.findOne({
        where: { certificatesId: id },
      });
      if (!certificate) {
        throw new NotFoundException(`Certificate with ID ${id} not found`);
      }
      await Certificate.delete(id);
    } catch (error) {
      const message = generateExceptionMessage(
        false,
        {},
        HttpStatus.BAD_REQUEST,
        'Something went wrong while Delete Certificates',
      );
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
