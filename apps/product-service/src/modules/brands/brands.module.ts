import { Module } from '@nestjs/common';
import { BrandsRepository } from './brands.repository';

@Module({
  providers: [BrandsRepository],
  exports: [BrandsRepository],
})
export class BrandsModule {}
