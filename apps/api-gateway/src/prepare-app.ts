import { NestExpressApplication } from '@nestjs/platform-express';

export const prepareApp = (app: NestExpressApplication): void => {
  app.enableCors();
  app.set('query parser', 'extended');
};
