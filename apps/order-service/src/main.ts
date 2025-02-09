import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { connectBrokerMicroservice } from '@packages/broker';
import { connectGrpcMicroservice } from '@packages/grpc/nest';
import { ORDER_CURRENT_PACKAGE } from '@packages/grpc/pb/order';
import { InternalDisabledLogger } from '@packages/shared/nest';
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
    packageName: ORDER_CURRENT_PACKAGE,
  });

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
