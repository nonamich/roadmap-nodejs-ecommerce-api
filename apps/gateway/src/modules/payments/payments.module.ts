import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import {
  PAYMENTS_PACKAGE_NAME,
  PAYMENTS_SERVICE_NAME,
} from '@repo/grpc/proto/payments';
import { UtilsGrpc } from '@repo/grpc/utils';
import {
  PAYMENTS_CLIENT_GRPC_PROVIDER_TOKEN,
  PAYMENTS_SERVICE_PROVIDER_TOKEN,
} from './payments.constants';
import { OrdersModule } from '~/modules/orders/orders.module';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [
    OrdersModule,
    ClientsModule.registerAsync([
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
    {
      provide: PAYMENTS_SERVICE_PROVIDER_TOKEN,
      inject: [PAYMENTS_CLIENT_GRPC_PROVIDER_TOKEN],
      useFactory(client: ClientGrpc) {
        return client.getService(PAYMENTS_SERVICE_NAME);
      },
    },
  ],
  exports: [PAYMENTS_SERVICE_PROVIDER_TOKEN],
  controllers: [PaymentsController]
})
export class PaymentModule {}
