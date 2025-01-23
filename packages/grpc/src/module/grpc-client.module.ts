import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UtilsGrpc } from '~/utils';
import { GRPC_CLIENT_TOKEN } from './grpc-client.constants';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './grpc-client.module-definition';
import { GrpcClientService } from './grpc-client.service';

@Module({
  exports: [GrpcClientService],
})
export class GrpcClientModule extends ConfigurableModuleClass {
  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      ...super.registerAsync(options),
      imports: [
        ClientsModule.registerAsync([
          {
            name: GRPC_CLIENT_TOKEN,
            inject: [MODULE_OPTIONS_TOKEN],
            useFactory({ packageName, url }: typeof OPTIONS_TYPE) {
              return {
                transport: Transport.GRPC,
                options: {
                  url,
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
