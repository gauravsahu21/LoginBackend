import { Injectable } from '@nestjs/common';
import { AddOrEditCertificate } from 'src/common/dto/certificates.dto';
import HttpResponse from 'src/common/lib/http-response';
import CertificateRepository from 'src/db/repository/certificates.repository';

@Injectable()
export default class CertificateServices {
  constructor(private readonly userRepository: CertificateRepository) {}

  async getCertificates() {
    try {
      const response = await this.userRepository.getCertificates();
      return HttpResponse.success(
        { response },
        'Certificates fetched succesfully',
        200,
      );
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }

  async addCertificates(addOrEditCertificates: AddOrEditCertificate) {
    try {
      const response = await this.userRepository.addCertificates(
        addOrEditCertificates,
      );
      return HttpResponse.success(
        { response },
        'certificates Add or Edit succesfully',
        200,
      );
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }

  async deleteCertificates(id: string) {
    try {
      const response = await this.userRepository.deleteCertificates(id);
      return HttpResponse.success(
        { response },
        'certificates delete succesfully',
        200,
      );
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }
}
