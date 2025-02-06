import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UsersGrpcController } from './users.grpc.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersGrpcController],
  providers: [PasswordService, UsersRepository, UsersService],
})
export class UsersModule {}
