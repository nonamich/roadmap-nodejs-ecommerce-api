import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import {
  ORDERS_PACKAGE_NAME,
  ORDERS_SERVICE_NAME,
} from '@repo/grpc/proto/orders';
import { UtilsGrpc } from '@repo/grpc/utils';
import { ProductsModule } from '~/modules/products/products.module';
import {
  ORDERS_CLIENT_GRPC_PROVIDER_TOKEN,
  ORDERS_SERVICE_PROVIDER_TOKEN,
} from './orders.constants';
import { OrdersController } from './orders.controller';

@Module({
  exports: [ORDERS_SERVICE_PROVIDER_TOKEN],
  controllers: [OrdersController],
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
              url: config.getOrThrow('GRPC_SERVER_URL_ORDERS'),
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
        return client.getService(ORDERS_SERVICE_NAME);
      },
    },
  ],
})
export class OrdersModule {}
