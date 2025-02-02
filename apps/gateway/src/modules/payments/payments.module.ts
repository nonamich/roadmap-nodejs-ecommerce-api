import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@repo/grpc/nest';
import {
  PAYMENTS_PACKAGE_NAME,
  PAYMENTS_SERVICE_NAME,
} from '@repo/grpc/proto/payments';
import { OrdersModule } from '~/modules/orders/orders.module';
import { PaymentsController } from './payments.controller';

@Module({
  exports: [GrpcClientModule],
  controllers: [PaymentsController],
  imports: [
    OrdersModule,
    GrpcClientModule.registerAsync({
      packageName: PAYMENTS_PACKAGE_NAME,
      serviceName: PAYMENTS_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVER_URL_PAYMENTS'),
        };
      },
    }),
  ],
})
export class PaymentModule {}
