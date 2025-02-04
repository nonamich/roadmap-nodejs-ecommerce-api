import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@repo/grpc/proto/users';
import { Observable } from 'rxjs';
import { PrismaClientExceptionFilter } from '~/modules/orm/filters/prisma-client-exception.filter';
import {
  CreateUserRequestDto,
  DeleteUserRequestDto,
  GetUserByCredentialsRequestDto,
  GetUserByEmailRequestDto,
  GetUserByIdRequestDto,
  GetUsersRequestDto,
  UpdateUserRequestDto,
} from './dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@GrpcService()
@UsersServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
export class UsersGrpcController implements UsersServiceController {
  constructor(private readonly service: UsersService) {}

  async createUser(
    @GrpcPayload()
    dto: CreateUserRequestDto,
  ): Promise<UserEntity> {
    return await this.service.createUser(dto);
  }

  async deleteUser(@GrpcPayload() dto: DeleteUserRequestDto): Promise<void> {
    return await this.service.deleteUser(dto);
  }

  async getUserById(
    @GrpcPayload() dto: GetUserByIdRequestDto,
  ): Promise<UserEntity> {
    return await this.service.getUserById(dto);
  }

  async getUserByEmail(
    @GrpcPayload() dto: GetUserByEmailRequestDto,
  ): Promise<UserEntity> {
    return await this.service.getUserByEmail(dto);
  }

  async getUserByCredentials(
    @GrpcPayload()
    dto: GetUserByCredentialsRequestDto,
  ): Promise<UserEntity> {
    return this.service.getUserByCredentials(dto);
  }

  async updateUser(
    @GrpcPayload()
    dto: UpdateUserRequestDto,
  ): Promise<UserEntity> {
    return await this.service.updateUser(dto);
  }

  getUsers(@GrpcPayload() dto: GetUsersRequestDto): Observable<UserEntity> {
    return this.service.getUsers(dto);
  }
}
