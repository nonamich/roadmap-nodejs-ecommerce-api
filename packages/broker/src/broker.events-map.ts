import {
  OrderCompletedEventDto,
  OrderCreatedEventDto,
  PaymentSucceededEventDto,
  UserEventDto,
} from './dto';

export type BrokerEventsMap = {
  'order.created': OrderCreatedEventDto;
  'order.completed': OrderCompletedEventDto;
  'payment.succeeded': PaymentSucceededEventDto;
  'user.registered': UserEventDto;
};
