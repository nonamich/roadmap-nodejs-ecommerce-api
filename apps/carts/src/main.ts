import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  connectGrpcMicroservice,
  InternalDisabledLogger,
} from '@repo/grpc/nest';
import { CARTS_PACKAGE_NAME } from '@repo/grpc/proto/carts';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new InternalDisabledLogger(),
  });
  const config = app.get(ConfigService);

  connectGrpcMicroservice(app, {
    url: config.getOrThrow('GRPC_SERVER_URL_CARTS'),
    packageName: CARTS_PACKAGE_NAME,
  });

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
