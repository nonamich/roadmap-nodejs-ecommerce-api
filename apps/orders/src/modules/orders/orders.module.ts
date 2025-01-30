import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import {
  CARTS_PACKAGE_NAME,
  CARTS_SERVICE_NAME,
} from '@packages/grpc/proto/carts';
import { ProductsServiceClient } from '@packages/grpc/proto/products';
import { UtilsGrpc } from '@packages/grpc/utils';
import {
  CARTS_CLIENT_GRPC_PROVIDER_TOKEN,
  CARTS_SERVICE_PROVIDER_TOKEN,
} from './orders.constants';
import { OrdersGrpcController } from './orders.grpc.controller';

@Module({
  controllers: [OrdersGrpcController],
  imports: [
    ClientsModule.registerAsync([
      {
        name: CARTS_CLIENT_GRPC_PROVIDER_TOKEN,
        inject: [ConfigService],
        useFactory(config: ConfigService) {
          return {
            transport: Transport.GRPC,
            options: {
              loader: {
                arrays: true,
                defaults: true,
              },
              url: config.getOrThrow('CARTS_GRPC_SERVER_URL'),
              package: CARTS_PACKAGE_NAME,
              protoPath: UtilsGrpc.getProtoFilePath(CARTS_PACKAGE_NAME),
            },
          };
        },
      },
    ]),
  ],
  providers: [
    {
      provide: CARTS_SERVICE_PROVIDER_TOKEN,
      inject: [CARTS_CLIENT_GRPC_PROVIDER_TOKEN],
      useFactory(client: ClientGrpc) {
        return client.getService<ProductsServiceClient>(CARTS_SERVICE_NAME);
      },
    },
  ],
})
export class OrdersModule {}
