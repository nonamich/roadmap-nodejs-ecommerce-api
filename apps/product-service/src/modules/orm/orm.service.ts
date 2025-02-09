import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@packages/shared/db/product';

@Injectable()
export class ORMService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
