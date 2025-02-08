import { GetCategoryBySlugRequest } from '@/grpc/pb/product';
import { IsString } from 'class-validator';

export class GetCategoryBySlugRequestDto implements GetCategoryBySlugRequest {
  @IsString()
  slug!: string;
}
