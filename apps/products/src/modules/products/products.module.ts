import { Module } from '@nestjs/common';
import { BrandsModule } from '../brands/brands.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsBrokerController } from './products.broker.controller';
import { ProductsGrpcController } from './products.grpc.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.services';

@Module({
  imports: [BrandsModule, CategoriesModule],
  providers: [ProductsRepository, ProductsService],
  controllers: [ProductsGrpcController, ProductsBrokerController],
})
export class ProductsModule {}
