import { GetUserByEmailRequest } from '@packages/grpc';
import { IsEmail } from 'class-validator';

export class GetUserByEmailRequestDto implements GetUserByEmailRequest {
  @IsEmail()
  email!: string;
}
