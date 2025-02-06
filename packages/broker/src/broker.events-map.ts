import {
  OrderCompletedEventDto,
  OrderCreatedEventDto,
  PaymentSucceededEventDto,
  UserRegisteredEventDto,
} from './dto';

export type BrokerEventsMap = {
  'order.created': OrderCreatedEventDto;
  'order.completed': OrderCompletedEventDto;
  'payment.succeeded': PaymentSucceededEventDto;
  'user.registered': UserRegisteredEventDto;
};
