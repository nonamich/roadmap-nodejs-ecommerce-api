import { Brand } from '@prisma/client/product/index.js';

export class BrandEntity implements Brand {
  id!: string;
  name!: string;
  slug!: string;
}
