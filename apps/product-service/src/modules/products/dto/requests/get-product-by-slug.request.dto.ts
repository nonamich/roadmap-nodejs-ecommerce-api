import { GetProductBySlugRequest } from '@repo/grpc/pb/product';
import { IsString } from 'class-validator';

export class GetProductBySlugRequestDto implements GetProductBySlugRequest {
  @IsString()
  slug!: string;
}
