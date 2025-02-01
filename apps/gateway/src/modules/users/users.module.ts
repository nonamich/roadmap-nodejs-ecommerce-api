import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_PACKAGE_NAME, USERS_SERVICE_NAME } from '@repo/grpc/proto/users';
import { UtilsGrpc } from '@repo/grpc/utils';
import {
  USERS_CLIENT_GRPC_PROVIDER_TOKEN,
  USERS_SERVICE_PROVIDER_TOKEN,
} from './users.constants';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USERS_CLIENT_GRPC_PROVIDER_TOKEN,
        inject: [ConfigService],
        useFactory(config: ConfigService) {
          return {
            transport: Transport.GRPC,
            options: {
              loader: {
                arrays: true,
                defaults: true,
              },
              url: config.getOrThrow('GRPC_SERVER_URL_USERS'),
              package: USERS_PACKAGE_NAME,
              protoPath: UtilsGrpc.getProtoFilePath(USERS_PACKAGE_NAME),
            },
          };
        },
      },
    ]),
  ],
  providers: [
    {
      provide: USERS_SERVICE_PROVIDER_TOKEN,
      inject: [USERS_CLIENT_GRPC_PROVIDER_TOKEN],
      useFactory(client: ClientGrpc) {
        return client.getService(USERS_SERVICE_NAME);
      },
    },
  ],
  exports: [USERS_SERVICE_PROVIDER_TOKEN],
})
export class UsersModule {}
