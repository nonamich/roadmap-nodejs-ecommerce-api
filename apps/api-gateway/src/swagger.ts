import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const DARK_THEME =
  'https://cdn.jsdelivr.net/gh/gumbarros/swagger-dark-theme/dark-swagger.css';

export const initSwagger = (app: INestApplication): void => {
  const swaggerConfig = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const config = app.get(ConfigService);
  const swaggerPath = config.getOrThrow('SWAGGER_PATH');
  const jsonDocumentUrl = config.getOrThrow('SWAGGER_JSON_DOCUMENT_URL');

  SwaggerModule.setup(swaggerPath, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCssUrl: DARK_THEME,
    jsonDocumentUrl,
  });
};
