import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { connectGrpcMicroservice } from '@repo/grpc/nest';
import { PAYMENT_PACKAGE_NAME } from '@repo/grpc/pb/payment';
import { InternalDisabledLogger } from '@repo/shared/nest';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    logger: new InternalDisabledLogger(),
  });
  const config = app.get(ConfigService);

  connectGrpcMicroservice(app, {
    url: config.getOrThrow('GRPC_SERVICE_URL_PAYMENT'),
    packageName: PAYMENT_PACKAGE_NAME,
  });

  await app.startAllMicroservices();
  await app.listen(config.getOrThrow('PORT'));
}

bootstrap();
