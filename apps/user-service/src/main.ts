import { connectGrpcMicroservice } from '@/grpc/nest';
import { USER_PACKAGE_NAME } from '@/grpc/pb/user';
import { InternalDisabledLogger } from '@/shared/nest';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new InternalDisabledLogger(),
  });
  const config = app.get(ConfigService);

  connectGrpcMicroservice(app, {
    url: config.getOrThrow('GRPC_SERVICE_URL_USER'),
    packageName: USER_PACKAGE_NAME,
  });

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
