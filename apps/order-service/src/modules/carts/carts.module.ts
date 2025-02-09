import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@packages/grpc/nest';
import { CART_PACKAGE_NAME, CART_SERVICE_NAME } from '@packages/grpc/pb/cart';

@Module({
  imports: [
    GrpcClientModule.registerAsync({
      packageName: CART_PACKAGE_NAME,
      serviceNameAndToken: CART_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVICE_URL_CART'),
        };
      },
    }),
  ],
  exports: [GrpcClientModule],
})
export class CartsModule {}
