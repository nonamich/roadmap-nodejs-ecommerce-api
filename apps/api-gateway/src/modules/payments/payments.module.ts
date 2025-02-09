import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@packages/grpc/nest';
import {
  PAYMENT_CURRENT_PACKAGE,
  PAYMENT_SERVICE_NAME,
} from '@packages/grpc/pb/payment';

@Module({
  exports: [GrpcClientModule],
  imports: [
    GrpcClientModule.registerAsync({
      packageName: PAYMENT_CURRENT_PACKAGE,
      serviceNameAndToken: PAYMENT_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVICE_URL_PAYMENT'),
        };
      },
    }),
  ],
})
export class PaymentModule {}
