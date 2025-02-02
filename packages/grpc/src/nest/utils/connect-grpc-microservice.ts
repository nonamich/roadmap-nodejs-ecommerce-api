import { ReflectionService } from '@grpc/reflection';
import { INestApplication } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { UtilsGrpc } from '../../utils';
import { GRPC_MICROSERVICE_DEFAULT_OPTIONS } from './constants';

export interface GrpcMicroserviceOptions {
  url: string;
  packageName: string;
}

export const connectGrpcMicroservice = (
  app: INestApplication,
  { url, packageName }: GrpcMicroserviceOptions,
) => {
  return app.connectMicroservice<GrpcOptions>(
    {
      transport: Transport.GRPC,
      options: {
        ...GRPC_MICROSERVICE_DEFAULT_OPTIONS,
        url,
        protoPath: UtilsGrpc.getProtoFilePath(packageName),
        package: packageName,
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    },
    {
      inheritAppConfig: true,
    },
  );
};
