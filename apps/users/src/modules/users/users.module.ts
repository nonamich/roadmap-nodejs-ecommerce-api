import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RABBITMQ_QUEUES, RabbitMqClientModule } from '@repo/rabbitmq';
import { PasswordService } from './password.service';
import { UsersGrpcController } from './users.grpc.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersGrpcController],
  providers: [PasswordService, UsersRepository, UsersService],
  imports: [
    RabbitMqClientModule.registerAsync({
      queue: RABBITMQ_QUEUES.USERS,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('RABBITMQ_URL'),
        };
      },
    }),
  ],
})
export class UsersModule {}
