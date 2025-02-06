import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { connectBrokerMicroservice } from '@repo/broker';
import { connectGrpcMicroservice } from '@repo/grpc/nest';
import { ORDER_PACKAGE_NAME } from '@repo/grpc/pb/order';
import { InternalDisabledLogger } from '@repo/shared';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new InternalDisabledLogger(),
  });
  const config = app.get(ConfigService);

  connectBrokerMicroservice(app, {
    url: config.getOrThrow('MQTT_URL'),
  });

  connectGrpcMicroservice(app, {
    url: config.getOrThrow('GRPC_SERVICE_URL_ORDER'),
    packageName: ORDER_PACKAGE_NAME,
  });

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
