import { GetProductsByIdsRequest } from '@packages/grpc/proto/products';
import { IsArray, IsInt } from 'class-validator';

export class GetProductsByIdsRequestDto implements GetProductsByIdsRequest {
  @IsInt()
  @IsArray()
  ids!: number[];
}
