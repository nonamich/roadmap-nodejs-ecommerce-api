import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@repo/grpc/nest';
import {
  PRODUCT_PACKAGE_NAME,
  PRODUCT_SERVICE_NAME,
} from '@repo/grpc/pb/product';
import { ProductsController } from './products.controller';

@Module({
  exports: [GrpcClientModule],
  controllers: [ProductsController],
  imports: [
    GrpcClientModule.registerAsync({
      packageName: PRODUCT_PACKAGE_NAME,
      serviceNameAndToken: PRODUCT_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVICE_URL_PRODUCT'),
        };
      },
    }),
  ],
})
export class ProductsModule {}
