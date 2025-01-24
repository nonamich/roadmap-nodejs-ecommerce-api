import * as grpc from '@grpc/grpc-js';
import { Injectable, ValidationPipe } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GrpcValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          message: Object.values(error.constraints!),
        }));

        return new RpcException({
          code: grpc.status.INVALID_ARGUMENT,
          message: 'Validation Error',
          details: JSON.stringify(formattedErrors),
        });
      },
    });
  }
}
