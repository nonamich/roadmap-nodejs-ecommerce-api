import { Controller, UseInterceptors } from '@nestjs/common';
import {
  BrokerEventPattern,
  BrokerPayload,
  MqttInterceptor,
  OrderEventDto,
  UserEventDto,
} from '@/broker';
import { NotificationsService } from '../notifications/notifications.service';

@Controller()
@UseInterceptors(MqttInterceptor)
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
