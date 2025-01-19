import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  DeleteUserRequest,
  GetUserRequest,
  GetUsersRequest,
  UpdateUserRequest,
  User,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@packages/grpc';
import { from, mergeAll } from 'rxjs';
import { ORMService } from '~/modules/orm/orm.service';
import { GrpcValidationPipe } from '~/pipes/grpc-validation-pipe';
import { CreateUserRequestDto } from './dto/create-user-request.dto';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly orm: ORMService) {}

  async createUser(@Payload(GrpcValidationPipe) data: CreateUserRequestDto) {
    return await this.orm.user.create({
      data,
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
      skip: Math.floor(pageSize * page - pageSize),
      take: pageSize,
    });

    return from(promise).pipe(mergeAll());
  }
}
