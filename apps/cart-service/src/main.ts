import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { connectBrokerMicroservice } from '@packages/broker';
import { connectGrpcMicroservice } from '@packages/grpc/nest';
import { CART_PACKAGE_NAME } from '@packages/grpc/pb/cart';
import { InternalDisabledLogger } from '@packages/shared/nest';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new InternalDisabledLogger(),
  });
  const config = app.get(ConfigService);

  connectGrpcMicroservice(app, {
    url: config.getOrThrow('GRPC_SERVICE_URL_CART'),
    packageName: CART_PACKAGE_NAME,
  });

  connectBrokerMicroservice(app, {
    url: config.getOrThrow('MQTT_URL'),
  });

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
