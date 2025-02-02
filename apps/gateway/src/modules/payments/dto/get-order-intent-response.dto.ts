import { ApiProperty } from '@nestjs/swagger';
import { GetIntentResponse, PaymentStatus } from '@repo/grpc/proto/payments';

export class GetIntentResponseDto implements GetIntentResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty({ enum: PaymentStatus })
  status!: PaymentStatus;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  clientSecret!: string;
}
