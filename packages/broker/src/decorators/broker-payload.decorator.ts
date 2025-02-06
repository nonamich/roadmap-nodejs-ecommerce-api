import { Payload } from '@nestjs/microservices';
import { BrokerValidationPipe } from '../pipes/broker-validation.pipe';

export function BrokerPayload(): ParameterDecorator {
  return Payload(BrokerValidationPipe);
}
