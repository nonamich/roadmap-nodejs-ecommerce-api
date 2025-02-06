import { GetBrandBySlugRequest } from '@repo/grpc/pb/product';
import { IsString } from 'class-validator';

export class GetBrandBySlugRequestDto implements GetBrandBySlugRequest {
  @IsString()
  slug!: string;
}
