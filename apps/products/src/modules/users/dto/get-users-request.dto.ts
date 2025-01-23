import { GetUsersRequest } from '@packages/grpc';
import { IsNumber, Min } from 'class-validator';

export class GetUsersRequestDto implements GetUsersRequest {
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsNumber()
  @Min(2)
  pageSize: number = 5;
}
