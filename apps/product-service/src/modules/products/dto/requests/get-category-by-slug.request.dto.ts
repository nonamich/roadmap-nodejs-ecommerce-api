import { GetCategoryBySlugRequest } from '@packages/grpc/pb/product';
import { IsString } from 'class-validator';

export class GetCategoryBySlugRequestDto implements GetCategoryBySlugRequest {
  @IsString()
  slug!: string;
}
