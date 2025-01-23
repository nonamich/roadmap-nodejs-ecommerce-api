import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserByCredentialsRequest,
  GetUserByEmailRequest,
  GetUserByIdRequest,
  GetUsersRequest,
  UpdateUserRequest,
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '@packages/grpc/proto/users';
import { USERS_PROVIDER_TOKEN } from './users.constants';

export class UsersService implements UsersServiceClient {
  private grpc!: UsersServiceClient;

  constructor(@Inject(USERS_PROVIDER_TOKEN) private client: ClientGrpc) {}

  onModuleInit() {
    this.grpc = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  createUser(request: CreateUserRequest) {
    return this.grpc.createUser(request);
  }

  getUserById(request: GetUserByIdRequest) {
    return this.grpc.getUserById(request);
  }

  getUserByEmail(request: GetUserByEmailRequest) {
    return this.grpc.getUserByEmail(request);
  }

  getUserByCredentials(request: GetUserByCredentialsRequest) {
    return this.grpc.getUserByCredentials(request);
  }

  updateUser(request: UpdateUserRequest) {
    return this.grpc.updateUser(request);
  }

  deleteUser(
    request: DeleteUserRequest,
  ): ReturnType<UsersServiceClient['deleteUser']> {
    return this.grpc.deleteUser(request);
  }

  getUsers(request: GetUsersRequest) {
    return this.grpc.getUsers(request);
  }
}
