import {
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrdersServiceClient } from '@repo/grpc/proto/orders';
import { PaymentsServiceClient } from '@repo/grpc/proto/payments';
import { firstValueFrom } from 'rxjs';
import { JWTAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { AuthorizedUser } from '../auth/auth.interface';
import { CurrentUser } from '../auth/decorators/authorized-user.decorator';
import { ORDERS_SERVICE_PROVIDER_TOKEN } from '../orders/orders.constants';
import { GetIntentResponseDto } from './dto';
import { PAYMENTS_SERVICE_PROVIDER_TOKEN } from './payments.constants';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject(ORDERS_SERVICE_PROVIDER_TOKEN)
    private readonly ordersService: OrdersServiceClient,

    @Inject(PAYMENTS_SERVICE_PROVIDER_TOKEN)
    private readonly paymentsService: PaymentsServiceClient,
  ) {}

  @ApiOkResponse({ type: GetIntentResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Get('/:intentId')
  async getIntent(
    @Param('intentId') intentId: string,
    @CurrentUser() user: AuthorizedUser,
  ) {
    const [intent, order] = await Promise.all([
      firstValueFrom(this.paymentsService.getIntent({ intentId })),
      firstValueFrom(this.ordersService.getOrderByIntentId({ intentId })),
    ]);

    if (order.userId !== user.id) {
      throw new ForbiddenException();
    }

    return intent;
  }
}
