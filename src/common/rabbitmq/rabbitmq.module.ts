// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { RabbitmqService } from './rabbitmq.service';

// @Module({
//     imports: [
//         ClientsModule.register([
//             {
//                 name: 'RABBITMQ_CLIENT',
//                 transport: Transport.RMQ,
//                 options: {
//                     urls: ['amqp://localhost:5672'],
//                     queue: 'my_queue',
//                     queueOptions: {
//                         durable: false,
//                     },
//                 },
//             },
//         ]),
//     ],
//     providers: [RabbitmqService]
// })
// export class RabbitmqModule { }
