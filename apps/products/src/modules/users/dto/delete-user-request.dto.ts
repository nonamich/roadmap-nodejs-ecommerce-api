import { DeleteUserRequest } from '@packages/grpc';
import { IsNumber } from 'class-validator';

export class DeleteUserRequestDto implements DeleteUserRequest {
  @IsNumber()
  id!: number;
}
