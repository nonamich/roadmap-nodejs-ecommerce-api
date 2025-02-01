import { GetUserByEmailRequest } from '@repo/grpc/proto/users';
import { IsEmail } from 'class-validator';

export class GetUserByEmailRequestDto implements GetUserByEmailRequest {
  @IsEmail()
  email!: string;
}
