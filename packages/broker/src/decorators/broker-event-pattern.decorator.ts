import { EventPattern, Transport } from '@nestjs/microservices';
import { BrokerEventsMap } from '../broker.events-map';

export function BrokerEventPattern(
  pattern: keyof BrokerEventsMap,
): MethodDecorator {
  return EventPattern(pattern, Transport.MQTT);
}
