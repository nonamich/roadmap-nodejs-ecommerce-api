import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@packages/grpc/nest';
import {
  PRODUCT_CURRENT_PACKAGE,
  PRODUCT_SERVICE_NAME,
} from '@packages/grpc/pb/product';
import { ProductsController } from './products.controller';

@Module({
  exports: [GrpcClientModule],
  controllers: [ProductsController],
  imports: [
    GrpcClientModule.registerAsync({
      packageName: PRODUCT_CURRENT_PACKAGE,
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
