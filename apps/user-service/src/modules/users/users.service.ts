import { Injectable } from '@nestjs/common';
import { GrpcUnauthenticatedException } from '@repo/grpc/nest';
import { UsersServiceController } from '@repo/grpc/proto/users';
import {
  CreateUserRequestDto,
  GetUserByCredentialsRequestDto,
} from './dto/requests';
import { UserEntity } from './entities';
import { PasswordService } from './password.service';
import { UsersRepository } from './users.repository';

@Injectable()
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

  async getUserByCredentials({
    email,
    password,
  }: GetUserByCredentialsRequestDto): Promise<UserEntity> {
    const user = await this.repository.findUniqueOrThrow({ email });

    const isVerifiedPassword = await this.passwordService.verifyPassword(
      user.password,
      password,
    );

    if (!isVerifiedPassword) {
      throw new GrpcUnauthenticatedException('Password does not match');
    }

    return user;
  }
}
