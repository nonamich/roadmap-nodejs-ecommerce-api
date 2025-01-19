import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [PasswordService],
})
export class UsersModule {}
