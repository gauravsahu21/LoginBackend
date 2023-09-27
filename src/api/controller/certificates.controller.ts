import { Body, Controller, Post, Get, Query,Delete, UseGuards } from '@nestjs/common';
import { AddOrEditCertificate } from 'src/common/dto/certificates.dto';
import { PermissionsAuthGuard, WriteAccess } from '../jwt-auth.guard';
import CertificateServices from '../service/certificates.service';

@Controller('certificates')
export default class CertificateController {
  constructor(private readonly certificates: CertificateServices) {}

  @Get('/')
  @UseGuards(PermissionsAuthGuard)
  async getCertificates() {
    return this.certificates.getCertificates();
  }

  @Post('/')
  @UseGuards(PermissionsAuthGuard)
  async addCertificates(@Body() addOrEditCertificates: AddOrEditCertificate) {
    return this.certificates.addCertificates(addOrEditCertificates);
  }

  @Delete('/')
  @UseGuards(PermissionsAuthGuard)
  async deleteCertificates(@Query('id') id: string) {
    return this.certificates.deleteCertificates(id);
  }
}
