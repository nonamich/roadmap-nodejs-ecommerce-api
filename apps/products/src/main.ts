import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  connectGrpcMicroservice,
  InternalDisabledLogger,
} from '@repo/grpc/nest';
import { PRODUCTS_PACKAGE_NAME } from '@repo/grpc/proto/products';
import { connectRabbitMqMicroservice, RABBITMQ_QUEUES } from '@repo/rabbitmq';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new InternalDisabledLogger(),
  });
  const config = app.get(ConfigService);

  connectRabbitMqMicroservice(app, {
    consumerTag: 'products',
    url: config.getOrThrow('RABBITMQ_URL'),
    queues: [RABBITMQ_QUEUES.USERS],
  });

  connectGrpcMicroservice(app, {
    url: config.getOrThrow('GRPC_SERVER_URL_PRODUCTS'),
    packageName: PRODUCTS_PACKAGE_NAME,
  });

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
