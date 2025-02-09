import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@packages/shared/db/user';

@Injectable()
export class ORMService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
