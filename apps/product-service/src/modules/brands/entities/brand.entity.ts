import { Brand } from 'prisma-client';

export class BrandEntity implements Brand {
  id!: string;
  name!: string;
  slug!: string;
}
