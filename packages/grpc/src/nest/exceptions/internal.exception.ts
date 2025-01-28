import { status } from '@grpc/grpc-js';
import { GrpcBaseException } from './base.exception';

export class GrpcInternalException extends GrpcBaseException {
  constructor(message: string) {
    super(message, status.INTERNAL);
  }
}
