import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { OrderEventDto, UserEventDto } from '@packages/broker';
import { USER_SERVICE_NAME, UserServiceClient } from '@packages/grpc/pb/user';
import { SentMessageInfo } from 'nodemailer';
import { firstValueFrom } from 'rxjs';
import { Logger } from 'testcontainers/build/common';

@Injectable()
export class NotificationsService {
  private logger = new Logger(this.constructor.name);

  constructor(
    private readonly mailerService: MailerService,

    @Inject(USER_SERVICE_NAME)
    private readonly usersService: UserServiceClient,
  ) {}

  async sendUserWelcome(user: UserEventDto): Promise<void> {
    await this.send({
      to: user.email,
      subject: `Welcome, ${user.name}!`,
      template: 'user.registered.hbs',
      context: {
        user,
      },
    });
  }

  async sendOrderInvoice({
    createdAt,
    orderId,
    totalPrice,
    userId,
  }: OrderEventDto): Promise<void> {
    const user = await firstValueFrom(
      this.usersService.getUserById({ id: userId }),
    );

    await this.send({
      to: user.email,
      subject: `Invoice, #${orderId}!`,
      template: 'order.completed.hbs',
      context: {
        order: {
          id: orderId,
          createdAt,
          totalPrice,
        },
        user,
      },
    });
  }

  async sendOrderCanceled({
    createdAt,
    orderId,
    totalPrice,
    userId,
  }: OrderEventDto): Promise<void> {
    const user = await firstValueFrom(
      this.usersService.getUserById({ id: userId }),
    );

    await this.send({
      to: user.email,
      subject: `Order canceled, #${orderId}!`,
      template: 'order.canceled.hbs',
      context: {
        order: {
          id: orderId,
          createdAt,
          totalPrice,
        },
        user,
      },
    });
  }

  async send(options: ISendMailOptions): Promise<SentMessageInfo> {
    const messageInfo = await this.mailerService.sendMail(options);

    this.logger.info(`Email to ${options.to} was send`);

    return messageInfo;
  }
}
