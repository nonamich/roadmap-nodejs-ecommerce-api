import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_PACKAGE_NAME, UtilsGrpc } from '@packages/grpc';
import { USERS_PROVIDER_TOKEN } from './users.constants';
import { UsersService } from './users.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USERS_PROVIDER_TOKEN,
        inject: [ConfigService],
        useFactory(config: ConfigService) {
          return {
            transport: Transport.GRPC,
            options: {
              url: config.getOrThrow('USERS_GRPC_SERVER_URL'),
              package: USERS_PACKAGE_NAME,
              protoPath: UtilsGrpc.getProtoFilePath(USERS_PACKAGE_NAME),
            },
          };
        },
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
