import { Controller, UseFilters } from '@nestjs/common';
import {
  BrokerEventPattern,
  BrokerPayload,
  BrokerPayloadFilter,
  OrderEventDto,
} from '@packages/broker';
import { PaymentsService } from './payments.service';

@Controller()
@UseFilters(BrokerPayloadFilter)
export class EventsBrokerController {
  constructor(private readonly service: PaymentsService) {}

  @BrokerEventPattern('order.canceled')
  async onOrderCanceled(
    @BrokerPayload() { intentId }: OrderEventDto,
  ): Promise<void> {
    await this.service.cancelIntent(intentId);
  }
}
