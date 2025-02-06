import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@repo/grpc/nest';
import { USERS_PACKAGE_NAME, USERS_SERVICE_NAME } from '@repo/grpc/proto/users';

@Module({
  exports: [GrpcClientModule],
  imports: [
    GrpcClientModule.registerAsync({
      packageName: USERS_PACKAGE_NAME,
      serviceNameAndToken: USERS_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVICE_URL_USER'),
        };
      },
    }),
  ],
})
export class UsersModule {}
