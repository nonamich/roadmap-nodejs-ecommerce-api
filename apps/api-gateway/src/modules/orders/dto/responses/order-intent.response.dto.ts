import { ApiProperty } from '@nestjs/swagger';
import { IntentResponseDto } from '~/modules/payments/dto/responses';
import { OrderProductsResponseDto } from './order-products.response.dto';

export class OrderIntentResponseDto extends OrderProductsResponseDto {
  @ApiProperty({ type: IntentResponseDto })
  intent!: IntentResponseDto;
}
