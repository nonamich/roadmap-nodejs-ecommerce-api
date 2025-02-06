import { Injectable } from '@nestjs/common';
import { BrokerService } from '@repo/broker';
import { GrpcUnauthenticatedException } from '@repo/grpc/nest';
import {
  CreateUserRequestDto,
  GetUserByCredentialsRequestDto,
  GetUserByIdRequestDto,
} from './dto/requests';
import { UserResponseDto } from './dto/responses';
import { UserEntity } from './entities';
import { PasswordService } from './password.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly brokerService: BrokerService,
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

    this.brokerService.emit('user.registered', {
      id: user.id,
      email: user.email,
      name: user.name,
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

  async getUserById({ id }: GetUserByIdRequestDto): Promise<UserResponseDto> {
    return await this.repository.findUniqueOrThrow({ id });
  }
}
