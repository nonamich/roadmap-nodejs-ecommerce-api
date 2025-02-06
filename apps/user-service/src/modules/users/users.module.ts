import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrokerModule } from '@repo/broker';
import { PasswordService } from './password.service';
import { UsersGrpcController } from './users.grpc.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersGrpcController],
  providers: [PasswordService, UsersRepository, UsersService],
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
