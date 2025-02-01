import { ApiProperty } from '@nestjs/swagger';
import { GetIntentResponse } from '@repo/grpc/proto/payments';

export class GetIntentResponseDto implements GetIntentResponse {
  @ApiProperty()
  amount!: number;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  clientSecret!: string;
}
