import { Controller } from '@nestjs/common';
import {
  BrokerEventPattern,
  BrokerPayload,
  OrderCreatedEventDto,
} from '@repo/broker';
import { CartsService } from './carts.service';

@Controller()
export class CartsBrokerController {
  constructor(private readonly service: CartsService) {}

  @BrokerEventPattern('order.created')
  async onOrderCreated(
    @BrokerPayload() { userId }: OrderCreatedEventDto,
  ): Promise<void> {
    await this.service.removeCart({ userId });
  }
}
