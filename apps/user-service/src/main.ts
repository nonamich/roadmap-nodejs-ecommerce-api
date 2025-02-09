import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { connectGrpcMicroservice } from '@packages/grpc/nest';
import { USER_CURRENT_PACKAGE } from '@packages/grpc/pb/user';
import { InternalDisabledLogger } from '@packages/shared/nest';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new InternalDisabledLogger(),
  });
  const config = app.get(ConfigService);

  connectGrpcMicroservice(app, {
    url: config.getOrThrow('GRPC_SERVICE_URL_USER'),
    packageName: USER_CURRENT_PACKAGE,
  });

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
