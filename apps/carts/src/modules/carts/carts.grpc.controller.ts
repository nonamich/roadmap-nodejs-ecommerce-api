import { Controller, Inject, UseFilters } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  GrpcInvalidArgumentException,
  GrpcToGrpcExceptionFilter,
  GrpcValidationPipe,
} from '@packages/grpc/nest';
import {
  CartResponse,
  CartsServiceController,
  CartsServiceControllerMethods,
} from '@packages/grpc/proto/carts';
import { ProductsServiceClient } from '@packages/grpc/proto/products';
import { firstValueFrom, toArray } from 'rxjs';
import { PrismaClientExceptionFilter } from '~/filters/prisma-client-exception.filter';
import { ORMService } from '~/modules/orm/orm.service';
import { PRODUCTS_SERVICE_PROVIDER_TOKEN } from './carts.constants';
import {
  AddToCartRequestDto,
  GetCartRequestDto,
  RemoveCartRequestDto,
  RemoveFromCartRequestDto,
} from './dto';

@Controller()
@CartsServiceControllerMethods()
export class CartsGrpcController implements CartsServiceController {
  constructor(
    @Inject(PRODUCTS_SERVICE_PROVIDER_TOKEN)
    private readonly productsService: ProductsServiceClient,
    private readonly orm: ORMService,
  ) {}

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async removeCart(
    @Payload(GrpcValidationPipe) { userId }: RemoveCartRequestDto,
  ) {
    await this.orm.cartItem.deleteMany({
      where: {
        userId,
      },
    });
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async getCart(@Payload(GrpcValidationPipe) { userId }: GetCartRequestDto) {
    const cartItems = await this.orm.cartItem.findMany({
      select: {
        quantity: true,
        productId: true,
        price: true,
      },
      where: {
        userId,
      },
    });
    const cart: CartResponse = {
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
    };

    if (!cartItems.length) {
      return cart;
    }

    const products = await firstValueFrom(
      this.productsService
        .getProductsByIds({
          ids: cartItems.map(({ productId }) => productId),
        })
        .pipe(toArray()),
    );

    products.forEach((product) => {
      const cartItem = cartItems.find(
        ({ productId }) => productId === product.id,
      )!;

      cart.items.push({
        ...cartItem,
        product,
      });

      cart.totalPrice += cartItem.price * cartItem.quantity;
      cart.totalQuantity += cartItem.quantity;
    });

    return cart;
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async addToCart(
    @Payload(GrpcValidationPipe)
    { productId, quantity, userId }: AddToCartRequestDto,
  ) {
    const product = await firstValueFrom(
      this.productsService.getProductById({ id: productId }),
    );

    if (product.amount < quantity) {
      throw new GrpcInvalidArgumentException('Quantity more than allowed');
    }

    await this.orm.cartItem.upsert({
      create: {
        price: product.price,
        userId,
        productId: product.id,
        quantity,
      },
      update: {
        quantity,
      },
      where: {
        productId_userId: {
          productId: product.id,
          userId,
        },
      },
    });

    return await this.getCart({ userId });
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async removeFromCart({ productId, userId }: RemoveFromCartRequestDto) {
    await this.orm.cartItem.delete({
      where: {
        productId_userId: {
          productId,
          userId,
        },
      },
    });

    return await this.getCart({ userId });
  }
}
