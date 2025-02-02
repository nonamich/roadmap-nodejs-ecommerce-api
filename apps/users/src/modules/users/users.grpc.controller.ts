import { UseFilters } from '@nestjs/common';
import { GrpcService, Payload } from '@nestjs/microservices';
import {
  GrpcToGrpcExceptionFilter,
  GrpcUnauthenticatedException,
  GrpcValidationPipe,
} from '@repo/grpc/nest';
import {
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@repo/grpc/proto/users';
import { from, mergeAll } from 'rxjs';
import { PrismaClientExceptionFilter } from '~/filters/prisma-client-exception.filter';
import { ORMService } from '~/modules/orm/orm.service';
import {
  CreateUserRequestDto,
  DeleteUserRequestDto,
  GetUserByCredentialsRequestDto,
  GetUserByEmailRequestDto,
  GetUserByIdRequestDto,
  GetUsersRequestDto,
  UpdateUserRequestDto,
} from './dto';
import { PasswordService } from './password.service';

@GrpcService()
@UsersServiceControllerMethods()
export class UsersGrpcController implements UsersServiceController {
  constructor(
    private readonly orm: ORMService,
    private readonly passwordService: PasswordService,
  ) {}

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
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

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async deleteUser(@Payload(GrpcValidationPipe) { id }: DeleteUserRequestDto) {
    await this.orm.user.delete({
      where: {
        id,
      },
    });
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async getUserById(
    @Payload(GrpcValidationPipe) { id }: GetUserByIdRequestDto,
  ) {
    return await this.orm.user.findUniqueOrThrow({
      where: { id },
      omit: { password: true },
    });
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async getUserByEmail(
    @Payload(GrpcValidationPipe) { email }: GetUserByEmailRequestDto,
  ) {
    return await this.orm.user.findUniqueOrThrow({
      where: { email },
      omit: { password: true },
    });
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async getUserByCredentials(
    @Payload(GrpcValidationPipe)
    { email, password }: GetUserByCredentialsRequestDto,
  ) {
    const { password: hashedPassword, ...user } =
      await this.orm.user.findUniqueOrThrow({
        where: { email },
      });

    let isVerifiedPassword: boolean;

    try {
      isVerifiedPassword = await this.passwordService.verifyPassword(
        hashedPassword,
        password,
      );
    } catch {
      isVerifiedPassword = false;
    }

    if (!isVerifiedPassword) {
      throw new GrpcUnauthenticatedException('Password does not match');
    }

    return user;
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
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

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
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
