import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { USER_SERVICE_NAME } from '@packages/grpc/pb/user';
import { SharedUtils } from '@packages/shared';
import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { NotificationsModule } from './notifications.module';
import { NotificationsService } from './notifications.service';

const compose = SharedUtils.readCompose(
  path.join(SharedUtils.rootDirname, 'compose.infra.yml'),
);

const MAIL_ADMIN_EMAIL = 'test@test.com';
const MAIL_ADMIN_NAME = 'test';

describe('Notification Service', () => {
  let service: NotificationsService;
  let container: StartedTestContainer;
  let smtpPort: number;
  let webUiPort: number;

  beforeAll(async () => {
    container = await new GenericContainer(
      compose.services['smtp-service'].image,
    )
      .withExposedPorts(1025, 8025)
      .start();

    smtpPort = container.getMappedPort(1025);
    webUiPort = container.getMappedPort(8025);
  });

  afterAll(async () => {
    if (container) {
      await container.stop();
    }
  });

  beforeEach(async () => {
    const MAIL_SERVER_URL = `smtp://${MAIL_ADMIN_EMAIL}:pass@localhost:${smtpPort}`;

    const moduleRef = await Test.createTestingModule({
      imports: [
        NotificationsModule,
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          load: [
            (): any => {
              return {
                GRPC_SERVICE_URL_USER: '',
                MAIL_ADMIN_EMAIL,
                MAIL_ADMIN_NAME,
                MAIL_SERVER_URL,
              };
            },
          ],
        }),
      ],
      providers: [
        {
          provide: USER_SERVICE_NAME,
          useValue: {},
        },
      ],
      exports: [NotificationsModule],
    }).compile();

    service = moduleRef.get(NotificationsService);
  }, 1000 * 60);

  it('should send an email', async () => {
    const sendTo = 'test@test.com';
    const text = 'test text';
    const subject = 'subject';
    await service.send({
      to: sendTo,
      subject,
      html: text,
    });

    await sleep(500);

    const response = await fetch(
      `http://localhost:${webUiPort}/api/v1/messages`,
    );
    const {
      messages: [message],
    } = (await response.json()) as any;

    expect(message).toBeDefined();
    expect(message.Subject).toEqual(subject);
    expect(message.To[0].Address).toEqual(sendTo);
    expect(message.From).toEqual({
      Name: MAIL_ADMIN_NAME,
      Address: MAIL_ADMIN_EMAIL,
    });
  });
});
