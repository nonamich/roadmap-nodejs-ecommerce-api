import { ReflectionService } from '@grpc/reflection';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { USERS_PACKAGE_NAME, UtilsGrpc } from '@packages/grpc';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const grpcService = app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url: config.getOrThrow('GRPC_SERVER_URL'),
      package: USERS_PACKAGE_NAME,
      protoPath: UtilsGrpc.getProtoFilePath(USERS_PACKAGE_NAME),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  await grpcService.listen();

  await app.init();
}

bootstrap();
