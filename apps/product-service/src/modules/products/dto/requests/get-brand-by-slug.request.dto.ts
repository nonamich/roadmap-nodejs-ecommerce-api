import { GetBrandBySlugRequest } from '@packages/grpc/pb/product';
import { IsString } from 'class-validator';

export class GetBrandBySlugRequestDto implements GetBrandBySlugRequest {
  @IsString()
  slug!: string;
}
