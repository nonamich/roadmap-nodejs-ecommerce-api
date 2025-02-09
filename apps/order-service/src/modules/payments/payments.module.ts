import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@packages/grpc/nest';
import {
  PAYMENT_PACKAGE_NAME,
  PAYMENT_SERVICE_NAME,
} from '@packages/grpc/pb/payment';

@Module({
  imports: [
    GrpcClientModule.registerAsync({
      packageName: PAYMENT_PACKAGE_NAME,
      serviceNameAndToken: PAYMENT_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVICE_URL_PAYMENT'),
        };
      },
    }),
  ],
  exports: [GrpcClientModule],
})
export class PaymentsModule {}
