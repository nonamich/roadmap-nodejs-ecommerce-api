import { Controller, UseInterceptors } from '@nestjs/common';
import {
  BrokerEventPattern,
  BrokerPayload,
  MqttInterceptor,
  OrderEventDto,
} from '@/broker';
import { PaymentsService } from './payments.service';

@Controller()
@UseInterceptors(MqttInterceptor)
export class EventsBrokerController {
  constructor(private readonly service: PaymentsService) {}

  @BrokerEventPattern('order.canceled')
  async onOrderCanceled(
    @BrokerPayload() { intentId }: OrderEventDto,
  ): Promise<void> {
    await this.service.cancelIntent(intentId);
  }
}
