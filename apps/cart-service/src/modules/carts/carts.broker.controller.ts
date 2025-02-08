import { Controller } from '@nestjs/common';
import { BrokerEventPattern, BrokerPayload, OrderEventDto } from '@/broker';
import { CartService } from './carts.service';

@Controller()
export class CartsBrokerController {
  constructor(private readonly service: CartService) {}

  @BrokerEventPattern('order.created')
  async onOrderCreated(
    @BrokerPayload() { userId }: OrderEventDto,
  ): Promise<void> {
    await this.service.removeCart({ userId });
  }
}
