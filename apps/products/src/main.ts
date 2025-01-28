import { ReflectionService } from '@grpc/reflection';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { UtilsGrpc } from '@packages/grpc/utils';
import { PRODUCTS_PACKAGE_NAME } from '@packages/grpc/proto/products';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url: config.getOrThrow('PRODUCTS_GRPC_SERVER_URL'),
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
