import { GrpcUnauthenticatedException } from '@repo/grpc/nest';
import { UsersServiceController } from '@repo/grpc/proto/users';
import { from, mergeAll, Observable } from 'rxjs';
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
import { PasswordService } from './password.service';
import { UsersRepository } from './users.repository';

export class UsersService implements UsersServiceController {
  constructor(
    private readonly repository: UsersRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async createUser({
    email,
    name,
    password: unsanitizedPassword,
  }: CreateUserRequestDto): Promise<UserEntity> {
    const hashedPassword =
      await this.passwordService.hashPassword(unsanitizedPassword);

    const user = await this.repository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }

  async deleteUser({ id }: DeleteUserRequestDto): Promise<void> {
    await this.repository.delete({ id });
  }

  async getUserById({ id }: GetUserByIdRequestDto): Promise<UserEntity> {
    return await this.repository.findUniqueOrThrow({ id });
  }

  async getUserByEmail({
    email,
  }: GetUserByEmailRequestDto): Promise<UserEntity> {
    return await this.repository.findUniqueOrThrow({ email });
  }

  async getUserByCredentials({
    email,
    password,
  }: GetUserByCredentialsRequestDto): Promise<UserEntity> {
    const user = await this.repository.findUniqueOrThrowWithPassword({ email });

    let isVerifiedPassword: boolean;

    try {
      isVerifiedPassword = await this.passwordService.verifyPassword(
        user.password,
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

  async updateUser({ id, ...data }: UpdateUserRequestDto): Promise<UserEntity> {
    if (data.password) {
      const hashedPassword = await this.passwordService.hashPassword(
        data.password,
      );

      data.password = hashedPassword;
    }

    return this.repository.update({
      data,
      where: {
        id,
      },
    });
  }

  getUsers({ page, pageSize }: GetUsersRequestDto): Observable<UserEntity> {
    const promise = this.repository.findMany({
      skip: Math.floor(pageSize * page - pageSize),
      take: pageSize,
    });

    return from(promise).pipe(mergeAll());
  }
}
