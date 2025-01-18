import { Controller } from '@nestjs/common';
import { GrpcStreamMethod } from '@nestjs/microservices';
import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserRequest,
  GetUsersRequest,
  UpdateUserRequest,
  User,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@packages/grpc';
import { from, mergeAll } from 'rxjs';
import { ORMService } from '~/orm/orm.service';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly orm: ORMService) {}

  @GrpcStreamMethod('USERS_SERVICE')
  async createUser(request: CreateUserRequest) {
    return await this.orm.user.create({
      data: request,
    });
  }

  async deleteUser({ id }: DeleteUserRequest) {
    await this.orm.user.delete({
      where: {
        id,
      },
    });
  }

  async getUser({ id }: GetUserRequest): Promise<User> {
    return await this.orm.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  updateUser({ id, ...data }: UpdateUserRequest): Promise<User> {
    return this.orm.user.update({
      data,
      where: {
        id,
      },
    });
  }

  getUsers({ page, pageSize }: GetUsersRequest) {
    const promise = this.orm.user.findMany({
      skip: pageSize * page - pageSize,
      take: pageSize,
    });

    return from(promise).pipe(mergeAll());
  }
}
