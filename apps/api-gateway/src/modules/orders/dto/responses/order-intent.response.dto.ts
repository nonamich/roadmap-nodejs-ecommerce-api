import { IntentResponseDto } from '~/modules/payments/dto/responses';
import { OrderProductsResponseDto } from './order-products.response.dto';

export class OrderIntentResponseDto extends OrderProductsResponseDto {
  intent!: IntentResponseDto;
}
