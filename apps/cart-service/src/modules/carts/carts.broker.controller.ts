import { Controller } from '@nestjs/common';
import {
  BrokerEventPattern,
  BrokerPayload,
  OrderCreatedEventDto,
} from '@repo/broker';
import { CartService } from './carts.service';

@Controller()
export class CartsBrokerController {
  constructor(private readonly service: CartService) {}

  @BrokerEventPattern('order.created')
  async onOrderCreated(
    @BrokerPayload() { userId }: OrderCreatedEventDto,
  ): Promise<void> {
    await this.service.removeCart({ userId });
  }
}
