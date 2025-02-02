import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@repo/grpc/nest';
import {
  PRODUCTS_PACKAGE_NAME,
  PRODUCTS_SERVICE_NAME,
} from '@repo/grpc/proto/products';
import { ProductsController } from './products.controller';

@Module({
  exports: [GrpcClientModule],
  controllers: [ProductsController],
  imports: [
    GrpcClientModule.registerAsync({
      packageName: PRODUCTS_PACKAGE_NAME,
      serviceName: PRODUCTS_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVER_URL_PRODUCTS'),
        };
      },
    }),
  ],
})
export class ProductsModule {}
