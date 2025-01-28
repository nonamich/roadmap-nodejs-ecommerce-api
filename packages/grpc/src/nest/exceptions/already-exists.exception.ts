import { status } from '@grpc/grpc-js';
import { GrpcBaseException } from './base.exception';

export class GrpcAlreadyExistsException extends GrpcBaseException {
  constructor(message: string) {
    super(message, status.ALREADY_EXISTS);
  }
}
