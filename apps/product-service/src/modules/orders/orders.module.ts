import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@/grpc/nest';
import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from '@/grpc/pb/order';

@Module({
  controllers: [],
  exports: [GrpcClientModule],
  imports: [
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
