import {
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrdersServiceClient } from '@packages/grpc/proto/orders';
import { firstValueFrom, toArray } from 'rxjs';
import { AuthorizedUser } from '~/modules/auth/auth.interface';
import { CurrentUser } from '~/modules/auth/decorators/authorized-user.decorator';
import { JWTAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { ConformationResponseDto } from './dto';
import { ORDERS_SERVICE_PROVIDER_TOKEN } from '../orders/orders.constants';
import { PAYMENTS_SERVICE_PROVIDER_TOKEN } from './payments.constants';
import { PaymentsServiceClient } from '@packages/grpc/proto/payments';

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
  async getIntentClientSecret(
    @Param('intentId') intentId: string,
    @CurrentUser() user: AuthorizedUser,
  ) {
    const {clientSecret} = await firstValueFrom( this.paymentsService.getIntent({intentId}));

    return {clientSecret};
  }
}
