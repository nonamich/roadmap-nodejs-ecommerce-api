import { Controller } from '@nestjs/common';
import {
  BrokerEventPattern,
  BrokerPayload,
  PaymentSucceededEventDto,
} from '@repo/broker';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersBrokerController {
  constructor(private readonly ordersService: OrdersService) {}

  @BrokerEventPattern('payment.succeeded')
  async onSucceededIntentPayment(
    @BrokerPayload() { intentId }: PaymentSucceededEventDto,
  ): Promise<void> {
    await this.ordersService.completeOrder({ intentId });
  }
}
