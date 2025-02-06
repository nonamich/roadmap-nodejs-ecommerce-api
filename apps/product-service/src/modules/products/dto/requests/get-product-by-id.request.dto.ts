import { GetProductByIdRequest } from '@repo/grpc/pb/product';
import { IsString } from 'class-validator';

export class GetProductByIdRequestDto implements GetProductByIdRequest {
  @IsString()
  id!: string;
}
