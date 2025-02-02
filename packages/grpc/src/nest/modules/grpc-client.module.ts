import { DynamicModule, Module } from '@nestjs/common';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { UtilsGrpc } from '../../utils';

interface GrpcOptionsCustom {
  url: string;
}

export interface ConfigModuleOptions {
  packageName: string;
  serviceName: string;

  useFactory: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<GrpcOptionsCustom> | GrpcOptionsCustom;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[];
}

@Module({})
export class GrpcClientModule {
  static registerAsync({
    serviceName,
    packageName,
    ...options
  }: ConfigModuleOptions): DynamicModule {
    const GRPC_CLIENT_TOKEN = Symbol('GRPC_CLIENTS_TOKEN');
    const GRPC_MODULE_OPTIONS_TOKEN = Symbol('GRPC_CLIENT_OPTIONS_TOKEN');
    const optionsProvider = {
      provide: GRPC_MODULE_OPTIONS_TOKEN,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    return {
      module: this,
      exports: [serviceName],
      providers: [
        {
          provide: serviceName,
          inject: [GRPC_CLIENT_TOKEN],
          useFactory(client: ClientGrpc) {
            return client.getService(serviceName);
          },
        },
      ],
      imports: [
        ClientsModule.registerAsync([
          {
            name: GRPC_CLIENT_TOKEN,
            extraProviders: [optionsProvider],
            inject: [GRPC_MODULE_OPTIONS_TOKEN],
            useFactory({ url }: GrpcOptionsCustom) {
              return {
                transport: Transport.GRPC,
                options: {
                  url,
                  loader: {
                    arrays: true,
                    enums: String,
                  },
                  package: packageName,
                  protoPath: UtilsGrpc.getProtoFilePath(packageName),
                },
              };
            },
          },
        ]),
      ],
    };
  }
}
