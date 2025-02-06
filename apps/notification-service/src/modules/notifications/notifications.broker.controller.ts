import { Controller, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  BrokerEventPattern,
  OrderCompletedEventDto,
  UserRegisteredEventDto,
} from '@repo/broker';
import { USER_SERVICE_NAME, UserServiceClient } from '@repo/grpc/pb/user';
import { firstValueFrom } from 'rxjs';
import { notificationsConfig } from './notifications.config';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsBrokerController {
  constructor(
    private readonly service: NotificationsService,
    @Inject(notificationsConfig.KEY)
    private readonly config: ConfigType<typeof notificationsConfig>,
    @Inject(USER_SERVICE_NAME)
    private readonly userService: UserServiceClient,
  ) {}

  @BrokerEventPattern('user.registered')
  async onUserRegistered(user: UserRegisteredEventDto): Promise<void> {
    await this.service.sendTemplate(user.email, {
      id: this.config.templates.user.registered,
      props: {
        'user.name': user.name,
        'user.email': user.email,
      },
    });
  }

  @BrokerEventPattern('order.completed')
  async onPaymentSucceeded({
    createdAt,
    orderId,
    totalPrice,
    userId,
  }: OrderCompletedEventDto): Promise<void> {
    const user = await firstValueFrom(
      this.userService.getUserById({ id: userId }),
    );

    await this.service.sendTemplate(user.email, {
      id: this.config.templates.user.registered,
      props: {
        'order.id': orderId,
        'order.totalPrice': totalPrice,
        'order.createdAt': createdAt.toLocaleString(),
        'user.email': user.email,
        'user.name': user.name,
      },
    });
  }
}
