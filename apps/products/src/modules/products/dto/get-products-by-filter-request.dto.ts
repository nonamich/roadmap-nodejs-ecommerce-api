import { GetProductsByFilterRequest } from '@packages/grpc/proto/products';
import { IsNumber, IsOptional } from 'class-validator';

export class GetProductsByFilterRequestDto
  implements GetProductsByFilterRequest
{
  @IsNumber()
  @IsOptional()
  brandId?: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
