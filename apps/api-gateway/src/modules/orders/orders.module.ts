import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@/grpc/nest';
import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from '@/grpc/pb/order';
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
      packageName: ORDER_PACKAGE_NAME,
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
