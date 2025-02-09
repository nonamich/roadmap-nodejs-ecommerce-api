import { Controller, UseFilters } from '@nestjs/common';
import {
  BrokerEventPattern,
  BrokerPayload,
  BrokerPayloadFilter,
  OrderEventDto,
} from '@packages/broker';
import { ProductsService } from './products.services';

@Controller()
@UseFilters(BrokerPayloadFilter)
export class ProductsBrokerController {
  constructor(private readonly service: ProductsService) {}

  @BrokerEventPattern('order.created')
  async onOrderCreated(
    @BrokerPayload() { items }: OrderEventDto,
  ): Promise<void> {
    for (const { productId, quantity } of items) {
      await this.service.decrementAmount(productId, quantity);
    }
  }

  @BrokerEventPattern('order.canceled')
  async onOrderCanceled(
    @BrokerPayload() { items }: OrderEventDto,
  ): Promise<void> {
    for (const { productId, quantity } of items) {
      await this.service.incrementAmount(productId, quantity);
    }
  }
}
