import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import {
  CARTS_PACKAGE_NAME,
  CARTS_SERVICE_NAME,
} from '@packages/grpc/proto/carts';
import { UtilsGrpc } from '@packages/grpc/utils';
import { ProductsModule } from '../products/products.module';
import {
  CARTS_CLIENT_GRPC_PROVIDER_TOKEN,
  CARTS_SERVICE_PROVIDER_TOKEN,
} from './carts.constants';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

@Module({
  imports: [
    ProductsModule,
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
    ]),
  ],
  providers: [
    {
      provide: CARTS_SERVICE_PROVIDER_TOKEN,
      inject: [CARTS_CLIENT_GRPC_PROVIDER_TOKEN],
      useFactory(client: ClientGrpc) {
        return client.getService(CARTS_SERVICE_NAME);
      },
    },
    CartsService,
  ],
  exports: [CARTS_SERVICE_PROVIDER_TOKEN],
  controllers: [CartsController],
})
export class CartsModule {}
