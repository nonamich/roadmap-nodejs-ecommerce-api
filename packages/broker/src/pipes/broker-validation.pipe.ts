import { Injectable, ValidationPipe } from '@nestjs/common';

@Injectable()
export class BrokerValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      transformOptions: {
        enableCircularCheck: true,
      },
    });
  }
}
