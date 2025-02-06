import {
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ORDERS_SERVICE_NAME,
  OrdersServiceClient,
} from '@repo/grpc/proto/orders';
import {
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
} from '@repo/grpc/proto/payments';
import { firstValueFrom } from 'rxjs';
import { AuthorizedUser } from '~/modules/auth/auth.interface';
import { Auth, CurrentUser } from '~/modules/auth/decorators';
import { IntentResponseDto } from './dto/responses';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject(ORDERS_SERVICE_NAME)
    private readonly ordersService: OrdersServiceClient,

    @Inject(PAYMENTS_SERVICE_NAME)
    private readonly paymentsService: PaymentsServiceClient,
  ) {}

  @ApiOkResponse({ type: IntentResponseDto })
  @Auth()
  @Get('/:intentId')
  async getIntent(
    @Param('intentId') intentId: string,
    @CurrentUser() user: AuthorizedUser,
  ): Promise<IntentResponseDto> {
    const order = await firstValueFrom(
      this.ordersService.getOrderByIntentId({ intentId }),
    );

    if (order.userId !== user.id) {
      throw new ForbiddenException();
    }

    const intent = await firstValueFrom(
      this.paymentsService.getIntent({ intentId }),
    );

    if (intent.status === 'succeeded' && order.status !== 'COMPLETED') {
      // TODO: TOTDO
      // await firstValueFrom(
      //   this.ordersService.completeOrder({ intentId: intent.id }),
      // );
    }

    return intent;
  }
}
