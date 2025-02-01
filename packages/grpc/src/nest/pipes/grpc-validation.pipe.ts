import { Injectable, ValidationError, ValidationPipe } from '@nestjs/common';
import { GrpcInvalidArgumentException } from '../exceptions';

@Injectable()
export class GrpcValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      transformOptions: {
        enableCircularCheck: true,
      },
      exceptionFactory: (errors) => {
        const messages = this.extractErrorMessages(errors);

        return new GrpcInvalidArgumentException(messages[0]);
      },
    });
  }

  extractErrorMessages(errors: ValidationError[]): string[] {
    const messages: string[] = [];

    errors.forEach((error) => {
      if (error.constraints) {
        messages.push(...Object.values(error.constraints));
      }
      if (error.children && error.children.length > 0) {
        messages.push(...this.extractErrorMessages(error.children));
      }
    });

    return messages;
  }
}
