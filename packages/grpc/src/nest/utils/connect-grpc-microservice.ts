import { ReflectionService } from '@grpc/reflection';
import { INestApplication } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { UtilsGrpc } from '../../utils';

interface Options {
  url: string;
  packageName: string;
}

export const connectGrpcMicroservice = (
  app: INestApplication,
  { url, packageName }: Options,
) => {
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url,
      package: packageName,
      loader: {
        arrays: true,
        enums: String,
      },
      protoPath: UtilsGrpc.getProtoFilePath(packageName),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });
};
