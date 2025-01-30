import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import {
  ORDERS_PACKAGE_NAME,
  ORDERS_SERVICE_NAME,
  OrdersServiceClient,
} from '@packages/grpc/proto/orders';
import { UtilsGrpc } from '@packages/grpc/utils';
import { ProductsModule } from '../products/products.module';
import {
  ORDERS_CLIENT_GRPC_PROVIDER_TOKEN,
  ORDERS_SERVICE_PROVIDER_TOKEN,
} from './orders.constants';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ProductsModule,
    ClientsModule.registerAsync([
      {
        name: ORDERS_CLIENT_GRPC_PROVIDER_TOKEN,
        inject: [ConfigService],
        useFactory(config: ConfigService) {
          return {
            transport: Transport.GRPC,
            options: {
              loader: {
                arrays: true,
                defaults: true,
              },
              url: config.getOrThrow('ORDERS_GRPC_SERVER_URL'),
              package: ORDERS_PACKAGE_NAME,
              protoPath: UtilsGrpc.getProtoFilePath(ORDERS_PACKAGE_NAME),
            },
          };
        },
      },
    ]),
  ],
  providers: [
    {
      provide: ORDERS_SERVICE_PROVIDER_TOKEN,
      inject: [ORDERS_CLIENT_GRPC_PROVIDER_TOKEN],
      useFactory(client: ClientGrpc) {
        return client.getService<OrdersServiceClient>(ORDERS_SERVICE_NAME);
      },
    },
  ],
  exports: [ORDERS_SERVICE_PROVIDER_TOKEN],
  controllers: [OrdersController],
})
export class OrdersModule {}
