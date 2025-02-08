import { GetProductsByIdsRequest } from '@/grpc/pb/product';
import { IsString } from 'class-validator';

export class GetProductsByIdsRequestDto implements GetProductsByIdsRequest {
  @IsString({ each: true, always: false })
  ids!: string[];
}
