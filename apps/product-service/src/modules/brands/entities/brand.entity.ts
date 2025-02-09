import { Brand } from '@prisma-client/index.js';

export class BrandEntity implements Brand {
  id!: string;
  name!: string;
  slug!: string;
}
