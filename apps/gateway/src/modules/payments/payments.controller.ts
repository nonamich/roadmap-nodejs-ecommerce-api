import {
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ORDERS_SERVICE_NAME,
  OrdersServiceClient,
} from '@repo/grpc/proto/orders';
import {
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
} from '@repo/grpc/proto/payments';
import { firstValueFrom } from 'rxjs';
import { JWTAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { AuthorizedUser } from '../auth/auth.interface';
import { CurrentUser } from '../auth/decorators/authorized-user.decorator';
import { GetIntentResponseDto } from './dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject(ORDERS_SERVICE_NAME)
    private readonly ordersService: OrdersServiceClient,

    @Inject(PAYMENTS_SERVICE_NAME)
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
