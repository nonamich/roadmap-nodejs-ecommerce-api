import { INestApplication } from '@nestjs/common';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { RabbitMqMicroserviceConsumerOptions } from './rabbitmq.types';

export const connectRabbitMqMicroservice = (
  app: INestApplication,
  { url, queues, consumerTag }: RabbitMqMicroserviceConsumerOptions,
): void => {
  for (const queue of queues) {
    app.connectMicroservice<RmqOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue,
        consumerTag,
      },
    });
  }
};
