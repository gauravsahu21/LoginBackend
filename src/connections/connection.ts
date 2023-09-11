/* eslint-disable prettier/prettier */
import { connect, Channel } from 'amqplib';

export async function createConnectionAndChannel(): Promise<Channel | null> {
  try {
    const connection = await connect(
      'amqp://careerassistant:careerassistant@161.97.186.200:5672/',
    );
    const channel = await connection.createChannel();

    const queueName = 'contactus';
    await channel.assertQueue(queueName, { durable: true });
    return channel;
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    return null;
  }
}
