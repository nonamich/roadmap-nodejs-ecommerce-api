import { CreateUserRequest } from '@packages/grpc';
import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class CreateUserRequestDto implements CreateUserRequest {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(4)
  name!: string;

  @IsStrongPassword()
  password!: string;
}
