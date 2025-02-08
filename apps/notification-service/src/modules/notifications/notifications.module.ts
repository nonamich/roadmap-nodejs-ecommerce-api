import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'node:path';
import { UsersModule } from '../users/users.module';
import { NotificationsService } from './notifications.service';

@Module({
  exports: [NotificationsService],
  providers: [NotificationsService],
  imports: [
    UsersModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          verifyTransporters: true,
          transport: config.getOrThrow('MAIL_SERVER_URL'),
          defaults: {
            from: {
              address: config.getOrThrow('MAIL_ADMIN_EMAIL'),
              name: config.getOrThrow('MAIL_ADMIN_NAME'),
            },
          },
          template: {
            dir: path.join(process.cwd(), 'templates'),
            adapter: new HandlebarsAdapter(),
          },
          options: {
            strict: true,
          },
        };
      },
    }),
  ],
})
export class NotificationsModule {}
