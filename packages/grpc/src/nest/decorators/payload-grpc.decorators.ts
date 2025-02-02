import { Payload } from '@nestjs/microservices';
import { GrpcValidationPipe } from '../pipes';

export function GrpcPayload() {
  return Payload(GrpcValidationPipe);
}
