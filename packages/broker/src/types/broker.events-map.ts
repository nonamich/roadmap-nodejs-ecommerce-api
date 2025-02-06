import { OrderCreatedEventDto, PaymentSucceededEventDto } from '../dto';

export type BrokerEventsMap = {
  'order.created': OrderCreatedEventDto;
  'payment.succeeded': PaymentSucceededEventDto;
};
