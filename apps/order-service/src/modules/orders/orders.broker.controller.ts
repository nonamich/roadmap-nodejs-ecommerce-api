import { Controller } from '@nestjs/common';
import {
  BrokerEventPattern,
  BrokerPayload,
  PaymentCanceledEventDto,
  PaymentSucceededEventDto,
} from '@/broker';
import { OrderService } from './orders.service';

@Controller()
export class OrdersBrokerController {
  constructor(private readonly orderService: OrderService) {}

  @BrokerEventPattern('payment.succeeded')
  async onSucceededIntentPayment(
    @BrokerPayload() { intentId }: PaymentSucceededEventDto,
  ): Promise<void> {
    await this.orderService.completeOrder({ intentId });
  }

  @BrokerEventPattern('payment.canceled')
  async onCanceledIntentPayment(
    @BrokerPayload() { intentId }: PaymentCanceledEventDto,
  ): Promise<void> {
    await this.orderService.cancelOrderByIntentId(intentId);
  }
}
