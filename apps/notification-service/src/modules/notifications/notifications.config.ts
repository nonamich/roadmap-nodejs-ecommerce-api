import { registerAs } from '@nestjs/config';
import { Expose, plainToInstance, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  @Expose()
  MAILTRAP_TOKEN!: string;

  @Type(() => Number)
  @IsInt()
  @Expose()
  MAILTRAP_INBOX_ID!: number;

  @Type(() => Number)
  @IsInt()
  @Expose()
  MAILTRAP_ACCOUNT_ID!: number;

  @IsEmail()
  @Expose()
  MAILTRAP_SENDER_EMAIL!: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  MAILTRAP_SENDER_NAME!: string;

  @IsUUID()
  @Expose()
  MAILTRAP_TEMPLATE_ID_ORDER_PAID!: string;

  @IsUUID()
  @Expose()
  MAILTRAP_TEMPLATE_ID_USER_REGISTERED!: string;
}

export const notificationsConfig = registerAs('notificationsConfig', () => {
  const env = getValidatedEnv(process.env);
  const config = {
    token: env.MAILTRAP_TOKEN,
    inboxId: +env.MAILTRAP_INBOX_ID,
    accountId: +env.MAILTRAP_ACCOUNT_ID,
    sender: {
      email: env.MAILTRAP_SENDER_EMAIL,
      name: env.MAILTRAP_SENDER_NAME,
    },
    templates: {
      order: {
        paid: env.MAILTRAP_TEMPLATE_ID_ORDER_PAID,
      },
      user: {
        registered: env.MAILTRAP_TEMPLATE_ID_USER_REGISTERED,
      },
    },
  };

  return config;
});

const getValidatedEnv = (env: NodeJS.ProcessEnv): EnvironmentVariables => {
  const config = plainToInstance(EnvironmentVariables, env, {
    excludeExtraneousValues: true,
  });

  const errors = validateSync(config, {});

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
};
