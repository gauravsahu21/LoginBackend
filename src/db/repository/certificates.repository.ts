/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { AddOrEditCertificate } from 'src/common/dto/certificates.dto';
import { generateExceptionMessage } from 'src/common/lib/exceptionMessageGenerator';
import { Certificate } from '../entity/certificates.entity';
import logger from '../../connections/logger/logger';

@Injectable()
export default class CertificateRepository {
  async getCertificates() {
    try {
      const response = await Certificate.find();
      return response;
    } catch (error) {
      logger.info("Error occured in getCertificates.Repo")
      logger.error(error)
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
      let { certificatesId, imageId,s3link, certificateName, certificateType,logoImageId,logoS3link } =
        addOrEditCertificates;
        let certificateToUpdate
        if(certificatesId){
       certificateToUpdate = await Certificate.findOne({
        where: { certificatesId: certificatesId },
      });
    }
      if (certificateToUpdate || certificatesId) {
        certificateToUpdate.imageId = imageId;
        certificateToUpdate.s3link = s3link;
        certificateToUpdate.certificateName = certificateName;
        certificateToUpdate.certificateType = certificateType;
        certificateToUpdate.logoImageId = logoImageId;
        certificateToUpdate.logoS3link = logoS3link;
        await Certificate.save(certificateToUpdate);
      } else {
        let certificate = new Certificate();
        certificate.certificatesId = uuidv4();
        certificate.imageId = imageId;
        certificate.s3link = s3link;
        certificate.certificateName = certificateName;
        certificate.certificateType = certificateType;
        certificate.logoImageId = logoImageId;
        certificate.logoS3link = logoS3link;
        await Certificate.save(certificate);
      }
    } catch (error) {
      logger.info("Error occured in addCertificates.Repo")
      logger.error(error)
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
      logger.info("Error occured in deleteCertificates.Repo")
      logger.error(error)
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
