import {
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ORDER_SERVICE_NAME, OrderServiceClient } from '@packages/grpc/pb/order';
import {
  PAYMENT_SERVICE_NAME,
  PaymentServiceClient,
} from '@packages/grpc/pb/payment';
import {
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
} from '@packages/grpc/pb/product';
import { firstValueFrom, toArray } from 'rxjs';
import { AuthorizedUser } from '~/modules/auth/auth.interface';
import { Auth, CurrentUser } from '~/modules/auth/decorators';
import { OrderProductsResponseDto, OrderResponseDto } from './dto/responses';
import { OrderIntentResponseDto } from './dto/responses/order-intent.response.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE_NAME)
    private readonly orderService: OrderServiceClient,

    @Inject(PRODUCT_SERVICE_NAME)
    private readonly productService: ProductServiceClient,

    @Inject(PAYMENT_SERVICE_NAME)
    private readonly paymentService: PaymentServiceClient,
  ) {}

  @ApiOkResponse({ type: OrderResponseDto, isArray: true })
  @Auth()
  @Get()
  async getOrders(
    @CurrentUser() user: AuthorizedUser,
  ): Promise<OrderResponseDto[]> {
    const { orders } = await firstValueFrom(
      this.orderService.getOrders({ userId: user.id }),
    );

    return orders;
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
      this.paymentService.getIntent({ intentId: (await order).intentId }),
    );

    return {
      ...order,
      intent,
    };
  }

  @ApiOkResponse({ type: OrderProductsResponseDto })
  @Auth()
  @Get('/:orderId')
  async getOrder(
    @Param('orderId') orderId: string,
    @CurrentUser() user: AuthorizedUser,
  ): Promise<OrderProductsResponseDto> {
    const order = await firstValueFrom(this.orderService.getOrder({ orderId }));

    if (order.userId !== user.id) {
      throw new HttpException('Not found', 404);
    }

    const productsIds = order.items.map(({ productId: id }) => id);
    const products = await firstValueFrom(
      this.productService
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
  @Auth()
  @Post()
  async createOrder(
    @CurrentUser() user: AuthorizedUser,
  ): Promise<OrderResponseDto> {
    return await firstValueFrom(
      this.orderService.createOrder({ userId: user.id }),
    );
  }

  @ApiOkResponse()
  @Auth()
  @Delete('/:orderId')
  async cancelOrder(
    @Param('orderId') orderId: string,
    @CurrentUser() user: AuthorizedUser,
  ): Promise<void> {
    const { value: isOwner } = await firstValueFrom(
      this.orderService.isOwner({ orderId, userId: user.id }),
    );

    if (!isOwner) {
      throw new UnauthorizedException();
    }

    await firstValueFrom(this.orderService.cancelOrder({ orderId }));
  }
}
