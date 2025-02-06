import { GetProductBySlugRequest } from '@repo/grpc/proto/products';
import { IsString } from 'class-validator';

export class GetProductBySlugRequestDto implements GetProductBySlugRequest {
  @IsString()
  slug!: string;
}
