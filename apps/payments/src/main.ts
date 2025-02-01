import { ReflectionService } from '@grpc/reflection';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { InternalDisabledLogger } from '@repo/grpc/nest';
import { PAYMENTS_PACKAGE_NAME } from '@repo/grpc/proto/payments';
import { UtilsGrpc } from '@repo/grpc/utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    logger: new InternalDisabledLogger(),
  });
  const config = app.get(ConfigService);

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url: config.getOrThrow('GRPC_SERVER_URL_PAYMENTS'),
      package: PAYMENTS_PACKAGE_NAME,
      protoPath: UtilsGrpc.getProtoFilePath(PAYMENTS_PACKAGE_NAME),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(config.getOrThrow('PAYMENTS_WEB_PORT'));
}

bootstrap();
