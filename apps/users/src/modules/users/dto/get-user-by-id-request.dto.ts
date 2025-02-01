import { GetUserByIdRequest } from '@repo/grpc/proto/users';
import { IsNumber } from 'class-validator';

export class GetUserByIdRequestDto implements GetUserByIdRequest {
  @IsNumber()
  id!: number;
}
