import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrdersServiceClient } from '@repo/grpc/proto/orders';
import { PaymentsServiceClient } from '@repo/grpc/proto/payments';
import { firstValueFrom } from 'rxjs';
import { JWTAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { ORDERS_SERVICE_PROVIDER_TOKEN } from '../orders/orders.constants';
import { ConformationResponseDto } from './dto';
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

  @ApiOkResponse({ type: ConformationResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Get('/intent/:intentId')
  async getIntentClientSecret(@Param('intentId') intentId: string) {
    const { clientSecret } = await firstValueFrom(
      this.paymentsService.getIntent({ intentId }),
    );

    return { clientSecret };
  }
}
