import { status } from '@grpc/grpc-js';
import { GrpcBaseException } from './base.exception';

export class GrpcAbortedException extends GrpcBaseException {
  constructor(message: string) {
    super(message, status.ABORTED);
  }
}
