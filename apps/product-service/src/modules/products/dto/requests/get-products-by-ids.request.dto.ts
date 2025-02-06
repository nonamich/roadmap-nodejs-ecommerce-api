import { GetProductsByIdsRequest } from '@repo/grpc/pb/product';
import { IsInt } from 'class-validator';

export class GetProductsByIdsRequestDto implements GetProductsByIdsRequest {
  @IsInt({ each: true, always: false })
  ids!: string[];
}
