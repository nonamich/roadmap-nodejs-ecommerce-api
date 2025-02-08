import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OrderCompletedEventDto, UserEventDto } from '@repo/broker';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailerService: MailerService) {}

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
    user,
  }: OrderCompletedEventDto): Promise<void> {
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

  async send(options: ISendMailOptions): Promise<SentMessageInfo> {
    return await this.mailerService.sendMail(options);
  }
}
