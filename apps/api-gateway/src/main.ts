import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { InternalDisabledLogger } from '@packages/shared/nest';
import { AppModule } from './app.module';
import { initSwagger } from './swagger';

bootstrap();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new InternalDisabledLogger(),
  });
  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3000;

  app.enableCors();
  app.set('query parser', 'extended');

  initSwagger(app);

  await app.listen(port);
}
