import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  UserServiceController,
  UserServiceControllerMethods,
} from '@repo/grpc/pb/user';
import { PrismaClientExceptionFilter } from '~/modules/orm/filters';
import {
  CreateUserRequestDto,
  GetUserByCredentialsRequestDto,
} from './dto/requests';
import { UserResponseDto } from './dto/responses';
import { UserService } from './users.service';

@GrpcService()
@UserServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
export class UsersGrpcController implements UserServiceController {
  constructor(private readonly service: UserService) {}

  async createUser(
    @GrpcPayload()
    dto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.service.createUser(dto);
  }

  async getUserByCredentials(
    @GrpcPayload()
    dto: GetUserByCredentialsRequestDto,
  ): Promise<UserResponseDto> {
    return this.service.getUserByCredentials(dto);
  }
}
