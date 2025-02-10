import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { default as request } from 'supertest';
import { AppModule } from '~/app.module';
import { prepareApp } from '~/prepare-app';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();

    prepareApp(app);

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/products/test').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
