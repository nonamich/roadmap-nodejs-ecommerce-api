import { Module } from '@nestjs/common';
import { ProductsGrpcController } from './products.grpc.controller';

@Module({
  controllers: [ProductsGrpcController],
})
export class ProductsModule {}
