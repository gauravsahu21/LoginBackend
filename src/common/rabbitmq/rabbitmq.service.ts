import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import logger from '../logger/loggerconnection';

@Injectable()
export default class RabbitMQService {
    private channel: amqp.Channel;

    async connect(url: string) {
        const connection = await amqp.connect(url);
        this.channel = await connection.createChannel();
    }

    async send(queue: string, message: any) {
        await this.connect('amqp://guest:guest@localhost:5672');
        await this.channel.assertQueue(queue);
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        logger.info("System launch");
    }

    async receive(queue: string, callback: (message: any) => void) {
        await this.connect('amqp://guest:guest@localhost:5672');
        await this.channel.assertQueue(queue);
        this.channel.consume(queue, (message) => {
            const content = message.content.toString();
            const parsedContent = JSON.parse(content);
            callback(parsedContent);
            this.channel.ack(message);
        });
    }

    async close() {
        setTimeout(async () => {
            await this.channel.close();
        }, 5000)
    }
}
