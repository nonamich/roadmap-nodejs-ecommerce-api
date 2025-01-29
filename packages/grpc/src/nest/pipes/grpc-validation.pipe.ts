import { Injectable, ValidationPipe } from '@nestjs/common';
import { GrpcInvalidArgumentException } from '../exceptions';

@Injectable()
export class GrpcValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory: ([error]) => {
        return new GrpcInvalidArgumentException(
          Object.values(error.constraints!)[0],
        );
      },
    });
  }
}
