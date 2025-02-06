import { Controller } from '@nestjs/common';
import {
  BrokerEventPattern,
  BrokerPayload,
  OrderCreatedEventDto,
} from '@repo/broker';
import { ProductsService } from './products.services';

@Controller()
export class ProductsBrokerController {
  constructor(private readonly service: ProductsService) {}

  @BrokerEventPattern('order.created')
  async onOrderCreated(
    @BrokerPayload() { products }: OrderCreatedEventDto,
  ): Promise<void> {
    for (const { productId, quantity } of products) {
      await this.service.decrementalAmount(productId, quantity);
    }
  }
}
