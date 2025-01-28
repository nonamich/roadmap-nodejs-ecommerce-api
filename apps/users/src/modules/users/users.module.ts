import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UsersGrpcController } from './users.grpc.controller';

@Module({
  controllers: [UsersGrpcController],
  providers: [PasswordService],
})
export class UsersModule {}
