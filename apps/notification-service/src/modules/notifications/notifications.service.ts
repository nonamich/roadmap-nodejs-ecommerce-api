import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { MailtrapClient, SendResponse } from 'mailtrap';
import { notificationsConfig } from './notifications.config';
import { NotificationTemplate } from './notifications.type';

@Injectable()
export class NotificationsService extends MailtrapClient {
  constructor(
    @Inject(notificationsConfig.KEY)
    private readonly config: ConfigType<typeof notificationsConfig>,
  ) {
    super({
      token: config.token,
      testInboxId: config.inboxId,
      accountId: config.accountId,
    });
  }

  async sendTemplate(
    email: string,
    template: NotificationTemplate,
  ): Promise<SendResponse> {
    const from = {
      email: this.config.sender.email,
      name: this.config.sender.name,
    };

    return await this.send({
      from,
      to: [{ email, name: 'my Mane' }],
      template_uuid: template.id,
      template_variables: template.props,
    });
  }
}
