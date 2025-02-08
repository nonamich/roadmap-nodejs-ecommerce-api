import { Controller, Inject } from '@nestjs/common';
import { BrokerEventPattern, BrokerPayload, OrderEventDto } from '@repo/broker';
import { ORDER_SERVICE_NAME, OrderServiceClient } from '@repo/grpc/pb/order';
import { firstValueFrom } from 'rxjs';
import { ProductsService } from './products.services';

@Controller()
export class ProductsBrokerController {
  constructor(
    private readonly service: ProductsService,

    @Inject(ORDER_SERVICE_NAME)
    private readonly ordersModule: OrderServiceClient,
  ) {}

  @BrokerEventPattern('order.created')
  async onOrderCreated(
    @BrokerPayload() { orderId }: OrderEventDto,
  ): Promise<void> {
    const order = await firstValueFrom(this.ordersModule.getOrder({ orderId }));

    for (const { productId, quantity } of order.items) {
      await this.service.decrementAmount(productId, quantity);
    }
  }

  @BrokerEventPattern('order.canceled')
  async onOrderCanceled(
    @BrokerPayload() { orderId }: OrderEventDto,
  ): Promise<void> {
    const order = await firstValueFrom(this.ordersModule.getOrder({ orderId }));

    for (const { productId, quantity } of order.items) {
      await this.service.incrementAmount(productId, quantity);
    }
  }
}
