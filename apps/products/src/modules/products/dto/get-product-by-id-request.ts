import { GetProductByIdRequest } from '@packages/grpc';
import { IsInt } from 'class-validator';

export class GetProductByIdRequestDto implements GetProductByIdRequest {
  @IsInt()
  id!: number;
}
