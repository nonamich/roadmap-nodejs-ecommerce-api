import { ReflectionService } from '@grpc/reflection';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { InternalDisabledLogger } from '@repo/grpc/nest';
import { PRODUCTS_PACKAGE_NAME } from '@repo/grpc/proto/products';
import { AppModule } from './app.module';
import { UtilsGrpc } from '@repo/grpc/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new InternalDisabledLogger(),
  });
  const config = app.get(ConfigService);

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url: config.getOrThrow('GRPC_SERVER_URL_PRODUCTS'),
      package: PRODUCTS_PACKAGE_NAME,
      protoPath: UtilsGrpc.getProtoFilePath(PRODUCTS_PACKAGE_NAME),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
