import { status } from '@grpc/grpc-js';
import { GrpcBaseException } from './base.exception';

export class GrpcNotFoundException extends GrpcBaseException {
  constructor(message: string) {
    super(message, status.NOT_FOUND);
  }
}
