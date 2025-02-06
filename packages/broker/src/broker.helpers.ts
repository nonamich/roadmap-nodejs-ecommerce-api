import { INestApplication } from '@nestjs/common';
import { MqttOptions, Transport } from '@nestjs/microservices';
import { BrokerMicroserviceConsumerOptions } from './types/broker.types';

export const connectBrokerMicroservice = (
  app: INestApplication,
  { url }: BrokerMicroserviceConsumerOptions,
): void => {
  app.connectMicroservice<MqttOptions>({
    transport: Transport.MQTT,
    options: {
      url,
    },
  });
};
