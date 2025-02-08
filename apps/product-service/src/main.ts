import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { connectBrokerMicroservice } from '@/broker';
import { connectGrpcMicroservice } from '@/grpc/nest';
import { PRODUCT_PACKAGE_NAME } from '@/grpc/pb/product';
import { InternalDisabledLogger } from '@/shared/nest';
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
    url: config.getOrThrow('GRPC_SERVICE_URL_PRODUCT'),
    packageName: PRODUCT_PACKAGE_NAME,
  });

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
