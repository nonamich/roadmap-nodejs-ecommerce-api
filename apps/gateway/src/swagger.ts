import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const DARK_THEME =
  'https://cdn.jsdelivr.net/gh/gumbarros/swagger-dark-theme/dark-swagger.css';

export function initSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCssUrl: DARK_THEME,
    jsonDocumentUrl: '/document.json',
  });
}
