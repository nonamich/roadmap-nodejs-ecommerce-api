import { GetProductByIdRequest } from '@repo/grpc/proto/products';
import { IsString } from 'class-validator';

export class GetProductByIdRequestDto implements GetProductByIdRequest {
  @IsString()
  id!: string;
}
