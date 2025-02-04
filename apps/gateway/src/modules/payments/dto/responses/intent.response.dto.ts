import { ApiProperty } from '@nestjs/swagger';
import { IntentResponse, PaymentStatus } from '@repo/grpc/proto/payments';

export class IntentResponseDto implements IntentResponse {
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
