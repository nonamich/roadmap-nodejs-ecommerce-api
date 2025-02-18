import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@packages/grpc/nest';
import {
  ORDER_CURRENT_PACKAGE,
  ORDER_SERVICE_NAME,
} from '@packages/grpc/pb/order';
import { ProductsModule } from '~/modules/products/products.module';
import { PaymentModule } from '../payments/payments.module';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  exports: [GrpcClientModule],
  imports: [
    PaymentModule,
    ProductsModule,
    GrpcClientModule.registerAsync({
      packageName: ORDER_CURRENT_PACKAGE,
      serviceNameAndToken: ORDER_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVICE_URL_ORDER'),
        };
      },
    }),
  ],
})
export class OrdersModule {}
