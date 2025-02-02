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
import {
  ORDERS_SERVICE_NAME,
  OrdersServiceClient,
} from '@repo/grpc/proto/orders';
import {
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from '@repo/grpc/proto/products';
import { firstValueFrom, toArray } from 'rxjs';
import { AuthorizedUser } from '~/modules/auth/auth.interface';
import { CurrentUser } from '~/modules/auth/decorators/authorized-user.decorator';
import { JWTAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { OrderResponseDto } from './dto';
import { OrderProductsResponseDto } from './dto/order-products-response.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE_NAME)
    private readonly ordersService: OrdersServiceClient,

    @Inject(PRODUCTS_SERVICE_NAME)
    private readonly productsService: ProductsServiceClient,
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
}
