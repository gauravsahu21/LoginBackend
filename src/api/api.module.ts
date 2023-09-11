import { Module } from '@nestjs/common';
import UserController from './controller/user.controller';
import UserService from './service/user.service';
import UserRepository from 'src/db/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import CertificateController from './controller/certificates.controller';
import CertificateServices from './service/certificates.service';


@Module({
    imports: [],
    controllers: [UserController,CertificateController],
    providers: [JwtService, UserService,CertificateServices, UserRepository],
})
export class ApiModule { }
