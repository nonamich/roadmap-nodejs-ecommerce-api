import {
  OrderEventDto,
  PaymentCanceledEventDto,
  PaymentSucceededEventDto,
  UserEventDto,
} from './dto';

export type BrokerEventsMap = {
  'order.created': OrderEventDto;
  'order.completed': OrderEventDto;
  'order.canceled': OrderEventDto;
  'payment.succeeded': PaymentSucceededEventDto;
  'payment.canceled': PaymentCanceledEventDto;
  'user.registered': UserEventDto;
};
