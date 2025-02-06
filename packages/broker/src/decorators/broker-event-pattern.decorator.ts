import { EventPattern, Transport } from '@nestjs/microservices';
import { BrokerEventsMap } from '../types';

export function BrokerEventPattern(
  pattern: keyof BrokerEventsMap,
): MethodDecorator {
  return EventPattern(pattern, Transport.MQTT);
}
