import { GetUserByCredentialsRequest } from '@packages/grpc';
import { IsEmail, IsString } from 'class-validator';

export class GetUserByCredentialsRequestDto
  implements GetUserByCredentialsRequest
{
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
