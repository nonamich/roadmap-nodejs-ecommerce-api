import { Controller, UseFilters } from '@nestjs/common';
import {
  BrokerEventPattern,
  BrokerPayload,
  BrokerPayloadFilter,
  OrderEventDto,
  UserEventDto,
} from '@packages/broker';
import { NotificationsService } from '../notifications/notifications.service';

@Controller()
@UseFilters(BrokerPayloadFilter)
export class EventsBrokerController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @BrokerEventPattern('user.registered')
  async onUserRegistered(@BrokerPayload() dto: UserEventDto): Promise<void> {
    await this.notificationsService.sendUserWelcome(dto);
  }

  @BrokerEventPattern('order.completed')
  async onPaymentSucceeded(
    @BrokerPayload()
    dto: OrderEventDto,
  ): Promise<void> {
    await this.notificationsService.sendOrderInvoice(dto);
  }

  @BrokerEventPattern('order.canceled')
  async onOrderCanceled(
    @BrokerPayload()
    dto: OrderEventDto,
  ): Promise<void> {
    await this.notificationsService.sendOrderCanceled(dto);
  }
}
