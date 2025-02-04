import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@repo/grpc/proto/users';
import { PrismaClientExceptionFilter } from '~/modules/orm/filters';
import {
  CreateUserRequestDto,
  GetUserByCredentialsRequestDto,
} from './dto/requests';
import { UserResponseDto } from './dto/responses';
import { UsersService } from './users.service';

@GrpcService()
@UsersServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
export class UsersGrpcController implements UsersServiceController {
  constructor(private readonly service: UsersService) {}

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
