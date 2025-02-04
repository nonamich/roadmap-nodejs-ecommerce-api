import { Brand } from 'prisma-client';

export class BrandEntity implements Brand {
  id!: number;
  name!: string;
}
