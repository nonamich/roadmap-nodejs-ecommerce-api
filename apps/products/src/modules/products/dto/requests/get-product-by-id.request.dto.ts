import { GetProductByIdRequest } from '@repo/grpc/proto/products';
import { IsInt } from 'class-validator';

export class GetProductByIdRequestDto implements GetProductByIdRequest {
  @IsInt()
  id!: number;
}
