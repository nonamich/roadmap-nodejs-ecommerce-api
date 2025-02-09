import { Brand } from '@packages/shared/db/product';

export class BrandEntity implements Brand {
  id!: string;
  name!: string;
  slug!: string;
}
