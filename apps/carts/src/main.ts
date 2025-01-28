import { ReflectionService } from '@grpc/reflection';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { CARTS_PACKAGE_NAME } from '@packages/grpc/proto/carts';
import { UtilsGrpc } from '@packages/grpc/utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url: config.getOrThrow('CARTS_GRPC_SERVER_URL'),
      package: CARTS_PACKAGE_NAME,
      protoPath: UtilsGrpc.getProtoFilePath(CARTS_PACKAGE_NAME),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
