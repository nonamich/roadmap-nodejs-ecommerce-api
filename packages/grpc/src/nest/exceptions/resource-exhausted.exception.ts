import { status } from '@grpc/grpc-js';
import { GrpcBaseException } from './base.exception';

export class GrpcResourceExhaustedException extends GrpcBaseException {
  constructor(message: string) {
    super(message, status.RESOURCE_EXHAUSTED);
  }
}
