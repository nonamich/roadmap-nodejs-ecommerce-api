import { DeleteUserRequest } from '@repo/grpc/proto/users';
import { IsNumber } from 'class-validator';

export class DeleteUserRequestDto implements DeleteUserRequest {
  @IsNumber()
  id!: number;
}
