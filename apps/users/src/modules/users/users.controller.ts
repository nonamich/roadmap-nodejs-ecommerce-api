import { Controller, UseFilters } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@packages/grpc';
import { from, mergeAll } from 'rxjs';
import { PrismaClientExceptionFilter } from '~/filters/prisma-client-exception.filter';
import { ORMService } from '~/modules/orm/orm.service';
import { GrpcValidationPipe } from '~/pipes/grpc-validation-pipe';
import {
  CreateUserRequestDto,
  DeleteUserRequestDto,
  GetUserRequestDto,
  GetUsersRequestDto,
  UpdateUserRequestDto,
} from './dto';
import { PasswordService } from './password.service';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(
    private readonly orm: ORMService,
    private readonly passwordService: PasswordService,
  ) {}

  @UseFilters(PrismaClientExceptionFilter)
  async createUser(
    @Payload(GrpcValidationPipe)
    { email, name, password: unsanitizedPassword }: CreateUserRequestDto,
  ) {
    const hashedPassword =
      await this.passwordService.hashPassword(unsanitizedPassword);

    const user = await this.orm.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      omit: { password: true },
    });

    return user;
  }

  @UseFilters(PrismaClientExceptionFilter)
  async deleteUser(@Payload(GrpcValidationPipe) { id }: DeleteUserRequestDto) {
    await this.orm.user.delete({
      where: {
        id,
      },
    });
  }

  @UseFilters(PrismaClientExceptionFilter)
  async getUser(@Payload(GrpcValidationPipe) { id }: GetUserRequestDto) {
    return await this.orm.user.findUniqueOrThrow({
      where: { id },
      omit: { password: true },
    });
  }

  @UseFilters(PrismaClientExceptionFilter)
  async updateUser(
    @Payload(GrpcValidationPipe)
    { id, ...data }: UpdateUserRequestDto,
  ) {
    if (data.password) {
      const hashedPassword = await this.passwordService.hashPassword(
        data.password,
      );

      data.password = hashedPassword;
    }

    return this.orm.user.update({
      data,
      where: {
        id,
      },
      omit: { password: true },
    });
  }

  @UseFilters(PrismaClientExceptionFilter)
  getUsers(
    @Payload(GrpcValidationPipe) { page, pageSize }: GetUsersRequestDto,
  ) {
    const promise = this.orm.user.findMany({
      skip: Math.floor(pageSize * page - pageSize),
      take: pageSize,
    });

    return from(promise).pipe(mergeAll());
  }
}
