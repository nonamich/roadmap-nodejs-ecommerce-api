import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@packages/grpc';
import { UsersService } from './users.service';

@Module({
  imports: [
    GrpcClientModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('USERS_GRPC_SERVER_URL'),
          packageName: 'users',
        };
      },
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
