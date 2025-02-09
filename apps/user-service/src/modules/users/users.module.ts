import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrokerModule } from '@packages/broker';
import { PasswordService } from './password.service';
import { UsersGrpcController } from './users.grpc.controller';
import { UsersRepository } from './users.repository';
import { UserService } from './users.service';

@Module({
  controllers: [UsersGrpcController],
  providers: [PasswordService, UsersRepository, UserService],
  imports: [
    BrokerModule.registerAsync({
      inject: [ConfigService],
      useFactory(config) {
        return {
          url: config.getOrThrow('MQTT_URL'),
        };
      },
    }),
  ],
})
export class UsersModule {}
