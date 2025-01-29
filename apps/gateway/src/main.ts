import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { initSwagger } from './swagger';

main();

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3000;

  app.enableCors();
  app.set('query parser', 'extended');

  initSwagger(app);

  await app.listen(port);
}
