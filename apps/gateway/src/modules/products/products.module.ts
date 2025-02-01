import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import {
  PRODUCTS_PACKAGE_NAME,
  PRODUCTS_SERVICE_NAME,
} from '@packages/grpc/proto/products';
import { UtilsGrpc } from '@packages/grpc/utils';
import {
  PRODUCTS_CLIENT_GRPC_PROVIDER_TOKEN,
  PRODUCTS_SERVICE_PROVIDER_TOKEN,
} from './products.constants';
import { ProductsController } from './products.controller';

@Module({
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
              url: config.getOrThrow('PRODUCTS_GRPC_SERVER_URL'),
              package: PRODUCTS_PACKAGE_NAME,
              protoPath: UtilsGrpc.getProtoFilePath(PRODUCTS_PACKAGE_NAME),
            },
          };
        },
      },
    ]),
  ],
  providers: [
    {
      provide: PRODUCTS_SERVICE_PROVIDER_TOKEN,
      inject: [PRODUCTS_CLIENT_GRPC_PROVIDER_TOKEN],
      useFactory(client: ClientGrpc) {
        return client.getService(PRODUCTS_SERVICE_NAME);
      },
    },
  ],
  exports: [PRODUCTS_SERVICE_PROVIDER_TOKEN],
  controllers: [ProductsController],
})
export class ProductsModule {}
