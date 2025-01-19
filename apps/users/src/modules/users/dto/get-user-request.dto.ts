import { GetUserRequest } from '@packages/grpc';
import { IsNumber } from 'class-validator';

export class GetUserRequestDto implements GetUserRequest {
  @IsNumber()
  id: number;
}
