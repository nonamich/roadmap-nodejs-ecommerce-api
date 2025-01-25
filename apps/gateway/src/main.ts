import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

bootstrap();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const config = app.get(ConfigService);
  // const port = config.get('PORT') || 3000;

  // app.enableCors();
  // initSwagger(app);

  await app.listen(3000);
}
