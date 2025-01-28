import { status } from '@grpc/grpc-js';
import { GrpcBaseException } from './base.exception';

export class GrpcUnavailableException extends GrpcBaseException {
  constructor(message: string) {
    super(message, status.UNAVAILABLE);
  }
}
