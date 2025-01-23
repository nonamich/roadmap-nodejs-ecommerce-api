import { GetUserByIdRequest } from '@packages/grpc';
import { IsNumber } from 'class-validator';

export class GetUserByIdRequestDto implements GetUserByIdRequest {
  @IsNumber()
  id!: number;
}
