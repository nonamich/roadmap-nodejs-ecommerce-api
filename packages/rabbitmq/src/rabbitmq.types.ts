import { RABBITMQ_QUEUES } from './rabbitmq.enums';

export type RabbitMqMicroserviceConsumerOptions = {
  consumerTag?: string;
  queues: RABBITMQ_QUEUES[];
  url: string;
};
