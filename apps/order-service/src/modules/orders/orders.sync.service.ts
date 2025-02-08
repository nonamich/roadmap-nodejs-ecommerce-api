import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BrokerService } from '@repo/broker';
import {
  PAYMENT_SERVICE_NAME,
  PaymentServiceClient,
} from '@repo/grpc/pb/payment';
import { catchError, firstValueFrom, of } from 'rxjs';
import { OrderService } from './orders.service';

@Injectable()
export class OrdersSyncService {
  private logger = new Logger(this.constructor.name);

  constructor(
    private readonly service: OrderService,

    @Inject(PAYMENT_SERVICE_NAME)
    private readonly paymentService: PaymentServiceClient,
    private readonly brokerService: BrokerService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async sync(): Promise<void> {
    const orders = await this.service.findPendingOrders();

    if (!orders.length) {
      return;
    }

    this.logger.debug(`${orders.length} pending orders was found`);

    for (const order of orders) {
      const intent = await firstValueFrom(
        this.paymentService
          .getIntent({ intentId: order.intentId })
          .pipe(catchError(() => of(null))),
      );

      if (!intent || intent.status !== 'succeeded') {
        continue;
      }

      this.brokerService.emit('payment.succeeded', {
        intentId: order.intentId,
      });

      this.logger.debug(`order was synced with intent`);
    }
  }
}
