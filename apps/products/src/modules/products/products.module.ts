import { Module } from '@nestjs/common';
import { BrandsModule } from '../brands/brands.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsGrpcController } from './products.grpc.controller';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [BrandsModule, CategoriesModule],
  providers: [ProductsRepository],
  controllers: [ProductsGrpcController],
  exports: [ProductsRepository],
})
export class ProductsModule {}
