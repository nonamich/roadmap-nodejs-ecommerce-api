import { DynamicModule, Module } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RABBITMQ_QUEUES } from './rabbitmq.enums';

type RabbitMqMicroserviceModuleOptions = {
  url: string;
};

type ConfigModuleOptions = {
  queue: RABBITMQ_QUEUES;
  useFactory: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) =>
    | Promise<RabbitMqMicroserviceModuleOptions>
    | RabbitMqMicroserviceModuleOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[];
};

@Module({})
export class RabbitMqClientModule {
  static registerAsync({
    queue,
    useFactory,
    inject,
  }: ConfigModuleOptions): DynamicModule {
    const OPTIONS_TOKEN = Symbol('OPTIONS_TOKEN');

    return {
      module: this,
      exports: [queue],
      providers: [
        {
          provide: OPTIONS_TOKEN,
          inject,
          useFactory,
        },
        {
          provide: queue,
          inject: [OPTIONS_TOKEN],
          useFactory(options: RabbitMqMicroserviceModuleOptions): ClientProxy {
            return ClientProxyFactory.create({
              transport: Transport.RMQ,
              options: {
                urls: [options.url],
                queue,
              },
            });
          },
        },
      ],
    };
  }
}
