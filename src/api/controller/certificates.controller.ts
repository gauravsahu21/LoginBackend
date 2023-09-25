import { Body, Controller, Post, Get, Query, UseGuards } from '@nestjs/common';
import { AddOrEditCertificate } from 'src/common/dto/certificates.dto';
import { WriteAccess } from '../jwt-auth.guard';
import CertificateServices from '../service/certificates.service';

@Controller('certificates')
export default class CertificateController {
  constructor(private readonly certificates: CertificateServices) {}

  @Get('/view')
  async getCertificates() {
    return this.certificates.getCertificates();
  }

  @Post('/add')
  @UseGuards(WriteAccess)
  async addCertificates(@Body() addOrEditCertificates: AddOrEditCertificate) {
    return this.certificates.addCertificates(addOrEditCertificates);
  }

  @Get('/delete')
  @UseGuards(WriteAccess)
  async deleteCertificates(@Query('id') id: string) {
    return this.certificates.deleteCertificates(id);
  }
}
