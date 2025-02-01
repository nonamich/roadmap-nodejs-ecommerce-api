import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import {
  PRODUCTS_PACKAGE_NAME,
  PRODUCTS_SERVICE_NAME,
} from '@repo/grpc/proto/products';
import { UtilsGrpc } from '@repo/grpc/utils';
import { CartsService } from './cart.service';
import {
  PRODUCTS_CLIENT_GRPC_PROVIDER_TOKEN,
  PRODUCTS_SERVICE_PROVIDER_TOKEN,
} from './carts.constants';
import { CartsGrpcController } from './carts.grpc.controller';

@Module({
  controllers: [CartsGrpcController],
  imports: [
    ClientsModule.registerAsync([
      {
        name: PRODUCTS_CLIENT_GRPC_PROVIDER_TOKEN,
        inject: [ConfigService],
        useFactory(config: ConfigService) {
          return {
            transport: Transport.GRPC,
            options: {
              loader: {
                arrays: true,
                defaults: true,
              },
              url: config.getOrThrow('GRPC_SERVER_URL_PRODUCTS'),
              package: PRODUCTS_PACKAGE_NAME,
              protoPath: UtilsGrpc.getProtoFilePath(PRODUCTS_PACKAGE_NAME),
            },
          };
        },
      },
    ]),
  ],
  providers: [
    CartsService,
    {
      provide: PRODUCTS_SERVICE_PROVIDER_TOKEN,
      inject: [PRODUCTS_CLIENT_GRPC_PROVIDER_TOKEN],
      useFactory(client: ClientGrpc) {
        return client.getService(PRODUCTS_SERVICE_NAME);
      },
    },
  ],
  exports: [PRODUCTS_SERVICE_PROVIDER_TOKEN],
})
export class CartsModule {}
