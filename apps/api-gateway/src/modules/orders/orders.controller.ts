import {
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
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
import {
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from '@repo/grpc/proto/products';
import { firstValueFrom, toArray } from 'rxjs';
import { AuthorizedUser } from '~/modules/auth/auth.interface';
import { Auth, CurrentUser } from '~/modules/auth/decorators';
import { OrderProductsResponseDto, OrderResponseDto } from './dto/responses';
import { OrderIntentResponseDto } from './dto/responses/order-intent.response.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE_NAME)
    private readonly ordersService: OrdersServiceClient,

    @Inject(PRODUCTS_SERVICE_NAME)
    private readonly productsService: ProductsServiceClient,

    @Inject(PAYMENTS_SERVICE_NAME)
    private readonly paymentsService: PaymentsServiceClient,
  ) {}

  @ApiOkResponse({ type: OrderResponseDto, isArray: true })
  @Auth()
  @Get()
  async getOrders(
    @CurrentUser() user: AuthorizedUser,
  ): Promise<OrderResponseDto[]> {
    const { orders } = await firstValueFrom(
      this.ordersService.getOrders({ userId: user.id }),
    );

    return orders;
  }

  @ApiOkResponse({ type: OrderProductsResponseDto })
  @Auth()
  @Get('/:orderId')
  async getOrder(
    @Param('orderId') orderId: string,
    @CurrentUser() user: AuthorizedUser,
  ): Promise<OrderProductsResponseDto> {
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

  @ApiOkResponse({ type: OrderIntentResponseDto })
  @Auth()
  @Get('/:orderId/intent')
  async getOrderIntent(
    @Param('orderId') orderId: string,
    @CurrentUser() user: AuthorizedUser,
  ): Promise<OrderIntentResponseDto> {
    const order = await this.getOrder(orderId, user);
    const intent = await firstValueFrom(
      this.paymentsService.getIntent({ intentId: (await order).intentId }),
    );

    return {
      ...order,
      intent,
    };
  }

  @ApiOkResponse({ type: OrderResponseDto })
  @Auth()
  @Post()
  async addOrder(
    @CurrentUser() user: AuthorizedUser,
  ): Promise<OrderResponseDto> {
    return await firstValueFrom(
      this.ordersService.createOrder({ userId: user.id }),
    );
  }
}
