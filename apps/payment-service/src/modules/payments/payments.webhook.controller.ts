import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
  UseFilters,
} from '@nestjs/common';
import type { Request } from 'express';
import { StripeHttpExceptionFilter } from './filters/stripe-http-exception.filter';
import { PaymentsService } from './payments.service';

@Controller()
@UseFilters(StripeHttpExceptionFilter)
export class PaymentsWebhookController {
  constructor(private readonly service: PaymentsService) {}

  @Post()
  @HttpCode(200)
  async webhook(
    @Req() req: RawBodyRequest<Request>,
  ): Promise<{ received: true }> {
    const {
      rawBody: payload,
      headers: { 'stripe-signature': signature },
    } = req;

    if (!payload) {
      throw new HttpException(
        'payload has no content',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!signature) {
      throw new HttpException(
        'signature has no content',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.service.processWebhook(payload, signature);

    return {
      received: true,
    };
  }
}
