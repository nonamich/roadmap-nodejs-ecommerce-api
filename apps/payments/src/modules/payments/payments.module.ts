import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import {
  ORDERS_PACKAGE_NAME,
  ORDERS_SERVICE_NAME,
} from '@repo/grpc/proto/orders';
import { UtilsGrpc } from '@repo/grpc/utils';
import { StripeMethod } from './methods/stripe.method';
import {
  ORDERS_CLIENT_GRPC_PROVIDER_TOKEN,
  ORDERS_SERVICE_PROVIDER_TOKEN,
} from './payments.constants';
import { PaymentsGrpcController } from './payments.grpc.controller';
import { PaymentsService } from './payments.service';
import { PaymentsWebhookController } from './payments.webhook.controller';

@Module({
  controllers: [PaymentsGrpcController, PaymentsWebhookController],
  imports: [
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
    StripeMethod,
    PaymentsService,
    {
      provide: ORDERS_SERVICE_PROVIDER_TOKEN,
      inject: [ORDERS_CLIENT_GRPC_PROVIDER_TOKEN],
      useFactory(client: ClientGrpc) {
        return client.getService(ORDERS_SERVICE_NAME);
      },
    },
  ],
})
export class PaymentsModule {}
