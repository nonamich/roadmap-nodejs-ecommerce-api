import { status } from '@grpc/grpc-js';
import { GrpcBaseException } from './base.exception';

export class GrpcUnauthenticatedException extends GrpcBaseException {
  constructor(message: string) {
    super(message, status.UNAUTHENTICATED);
  }
}
