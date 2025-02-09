import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@packages/grpc/nest';
import { USER_CURRENT_PACKAGE, USER_SERVICE_NAME } from '@packages/grpc/pb/user';

@Module({
  exports: [GrpcClientModule],
  imports: [
    GrpcClientModule.registerAsync({
      packageName: USER_CURRENT_PACKAGE,
      serviceNameAndToken: USER_SERVICE_NAME,
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
