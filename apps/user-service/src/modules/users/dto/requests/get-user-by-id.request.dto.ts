import { GetUserByIdRequest } from '@/grpc/pb/user';
import { IsString } from 'class-validator';

export class GetUserByIdRequestDto implements GetUserByIdRequest {
  @IsString()
  id!: string;
}
