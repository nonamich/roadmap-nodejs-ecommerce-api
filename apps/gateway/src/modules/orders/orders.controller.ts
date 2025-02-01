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
import { PaymentsServiceClient } from '@packages/grpc/proto/payments';
import { ProductsServiceClient } from '@packages/grpc/proto/products';
import { firstValueFrom, toArray } from 'rxjs';
import { AuthorizedUser } from '~/modules/auth/auth.interface';
import { CurrentUser } from '~/modules/auth/decorators/authorized-user.decorator';
import { JWTAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { PAYMENTS_SERVICE_PROVIDER_TOKEN } from '~/modules/payments/payments.constants';
import { PRODUCTS_SERVICE_PROVIDER_TOKEN } from '~/modules/products/products.constants';
import { OrderResponseDto } from './dto';
import { OrderProductsResponseDto } from './dto/order-products-response.dto';
import { ORDERS_SERVICE_PROVIDER_TOKEN } from './orders.constants';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE_PROVIDER_TOKEN)
    private readonly ordersService: OrdersServiceClient,

    @Inject(PRODUCTS_SERVICE_PROVIDER_TOKEN)
    private readonly productsService: ProductsServiceClient,

    @Inject(PAYMENTS_SERVICE_PROVIDER_TOKEN)
    private readonly paymentsService: PaymentsServiceClient,
  ) {}

  @ApiOkResponse({ type: OrderResponseDto, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Get()
  async getOrders(@CurrentUser() user: AuthorizedUser) {
    const { orders } = await firstValueFrom(
      this.ordersService.getOrders({ userId: user.id }),
    );

    if (!orders.length) {
      return [];
    }

    return orders;
  }

  @ApiOkResponse({ type: OrderProductsResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Get('/:orderId')
  async getOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
    @CurrentUser() user: AuthorizedUser,
  ) {
    const order = await firstValueFrom(
      this.ordersService.getOrder({ orderId }),
    );

    if (order.userId !== user.id) {
      throw new HttpException('Not found', 404);
    }

    const productsIds = order.items.map(({ productId: id }) => id);
    const products = await firstValueFrom(
      this.productsService
        .getProductsByIds({
          ids: productsIds,
        })
        .pipe(toArray()),
    );

    return {
      ...order,
      items: products.map((product) => {
        const item = order.items.find(
          ({ productId }) => productId === product.id,
        )!;

        return {
          ...item,
          product,
        };
      }),
    };
  }

  @ApiOkResponse({ type: OrderResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Post()
  async addOrder(@CurrentUser() user: AuthorizedUser) {
    return this.ordersService.createOrder({ userId: user.id });
  }

  @ApiOkResponse({})
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Post()
  async getOrderConformation(@CurrentUser() user: AuthorizedUser) {
    const order = await firstValueFrom(
      this.ordersService.createOrder({ userId: user.id }),
    );
    const intent = await firstValueFrom(
      this.paymentsService.getIntent({ intentId: order.indentId }),
    );

    return {
      ...order,
      intentSecret: intent.clientSecret,
    };
  }
}
