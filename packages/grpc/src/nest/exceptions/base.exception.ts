import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { createGrpcExceptionObject } from '../utils';

export abstract class GrpcBaseException extends RpcException {
  constructor(message: string, code: status) {
    super(createGrpcExceptionObject(message, code));
  }
}
