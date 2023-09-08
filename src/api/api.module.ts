import { Module } from '@nestjs/common';
import UserController from './controller/user.controller';
import UserService from './service/user.service';
import RabbitMQService from '../common/rabbitmq/rabbitmq.service';
import UserRepository from 'src/db/repository/user.repository';
import { JwtService } from '@nestjs/jwt';


@Module({
    imports: [],
    controllers: [UserController],
    providers: [JwtService, UserService, RabbitMQService, UserRepository],
})
export class ApiModule { }
