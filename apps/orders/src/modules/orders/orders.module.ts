import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import {
  CARTS_PACKAGE_NAME,
  CARTS_SERVICE_NAME,
} from '@repo/grpc/proto/carts';
import {
  PAYMENTS_PACKAGE_NAME,
  PAYMENTS_SERVICE_NAME,
} from '@repo/grpc/proto/payments';
import { UtilsGrpc } from '@repo/grpc/utils';
import {
  CARTS_CLIENT_GRPC_PROVIDER_TOKEN,
  CARTS_SERVICE_PROVIDER_TOKEN,
  PAYMENTS_CLIENT_GRPC_PROVIDER_TOKEN,
  PAYMENTS_SERVICE_PROVIDER_TOKEN,
} from './orders.constants';
import { OrdersGrpcController } from './orders.grpc.controller';
import { OrdersService } from './orders.service';

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
              url: config.getOrThrow('GRPC_SERVER_URL_CARTS'),
              package: CARTS_PACKAGE_NAME,
              protoPath: UtilsGrpc.getProtoFilePath(CARTS_PACKAGE_NAME),
            },
          };
        },
      },
      {
        name: PAYMENTS_CLIENT_GRPC_PROVIDER_TOKEN,
        inject: [ConfigService],
        useFactory(config: ConfigService) {
          return {
            transport: Transport.GRPC,
            options: {
              loader: {
                arrays: true,
                defaults: true,
              },
              url: config.getOrThrow('GRPC_SERVER_URL_PAYMENTS'),
              package: PAYMENTS_PACKAGE_NAME,
              protoPath: UtilsGrpc.getProtoFilePath(PAYMENTS_PACKAGE_NAME),
            },
          };
        },
      },
    ]),
  ],
  providers: [
    OrdersService,
    {
      provide: CARTS_SERVICE_PROVIDER_TOKEN,
      inject: [CARTS_CLIENT_GRPC_PROVIDER_TOKEN],
      useFactory(client: ClientGrpc) {
        return client.getService(CARTS_SERVICE_NAME);
      },
    },
    {
      provide: PAYMENTS_SERVICE_PROVIDER_TOKEN,
      inject: [PAYMENTS_CLIENT_GRPC_PROVIDER_TOKEN],
      useFactory(client: ClientGrpc) {
        return client.getService(PAYMENTS_SERVICE_NAME);
      },
    },
  ],
})
export class OrdersModule {}
