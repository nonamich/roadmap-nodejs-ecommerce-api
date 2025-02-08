import { Module } from '@nestjs/common';
import { BrandsModule } from '../brands/brands.module';
import { CategoriesModule } from '../categories/categories.module';
import { OrdersModule } from '../orders/orders.module';
import { ProductsBrokerController } from './products.broker.controller';
import { ProductsGrpcController } from './products.grpc.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.services';

@Module({
  imports: [BrandsModule, CategoriesModule, OrdersModule],
  providers: [ProductsRepository, ProductsService],
  controllers: [ProductsGrpcController, ProductsBrokerController],
})
export class ProductsModule {}
