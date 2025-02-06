import { GetProductsByIdsRequest } from '@repo/grpc/proto/products';
import { IsInt } from 'class-validator';

export class GetProductsByIdsRequestDto implements GetProductsByIdsRequest {
  @IsInt({ each: true, always: false })
  ids!: string[];
}
