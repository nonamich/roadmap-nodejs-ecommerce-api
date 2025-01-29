import { Controller, Inject, UseFilters } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  GrpcInvalidArgumentException,
  GrpcToGrpcExceptionFilter,
  GrpcValidationPipe,
} from '@packages/grpc/nest';
import {
  Cart,
  CartsServiceController,
  CartsServiceControllerMethods,
} from '@packages/grpc/proto/carts';
import { ProductsServiceClient } from '@packages/grpc/proto/products';
import { firstValueFrom } from 'rxjs';
import { PrismaClientExceptionFilter } from '~/filters/prisma-client-exception.filter';
import { ORMService } from '../orm/orm.service';
import { PRODUCTS_SERVICE_PROVIDER_TOKEN } from './carts.constants';
import {
  AddProductToCartRequestDto,
  GetCartByUserIdRequestDto,
  GetCartQuantityByUserIdRequestDto,
  RemoveProductRequestDto,
  UpdateProductQuantityRequestDto,
} from './dto';

@Controller()
@CartsServiceControllerMethods()
export class CartsGrpcController implements CartsServiceController {
  constructor(
    @Inject(PRODUCTS_SERVICE_PROVIDER_TOKEN)
    private readonly productsService: ProductsServiceClient,
    private readonly orm: ORMService,
  ) {}

  @UseFilters(PrismaClientExceptionFilter, GrpcToGrpcExceptionFilter)
  async getCartByUserId(
    @Payload(GrpcValidationPipe) { userId }: GetCartByUserIdRequestDto,
  ) {
    const cartItems = await this.orm.cartItem.findMany({
      select: {
        quantity: true,
        productId: true,
      },
      where: {
        userId,
      },
    });
    const cart: Cart = {
      items: [],
      totalPrice: 0,
    };
    const { products } = await firstValueFrom(
      this.productsService.getProductsByIds({
        ids: cartItems.map(({ productId }) => productId),
      }),
    );

    products.forEach((product) => {
      const { quantity } = cartItems.find(
        ({ productId }) => productId === product.id,
      )!;

      cart.items.push({
        quantity,
        product,
      });

      cart.totalPrice += product.price * quantity;
    });

    return cart;
  }

  @UseFilters(PrismaClientExceptionFilter, GrpcToGrpcExceptionFilter)
  async getCartQuantityByUserId(
    @Payload(GrpcValidationPipe) { userId }: GetCartQuantityByUserIdRequestDto,
  ) {
    let {
      _sum: { quantity },
    } = await this.orm.cartItem.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        userId,
      },
    });

    if (!quantity) {
      quantity = 0;
    }

    return {
      quantity,
    };
  }

  @UseFilters(PrismaClientExceptionFilter, GrpcToGrpcExceptionFilter)
  async addProductToCart(
    @Payload(GrpcValidationPipe)
    { productId, quantity, userId }: AddProductToCartRequestDto,
  ) {
    const product = await firstValueFrom(
      this.productsService.getProductById({ id: productId }),
    );

    await this.orm.cartItem.upsert({
      create: {
        userId,
        productId: product.id,
        quantity,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      where: {
        productId_userId: {
          productId: product.id,
          userId,
        },
      },
    });

    return await this.getCartQuantityByUserId({ userId });
  }

  @UseFilters(PrismaClientExceptionFilter, GrpcToGrpcExceptionFilter)
  async updateProductQuantity({
    productId,
    quantity,
    userId,
  }: UpdateProductQuantityRequestDto) {
    const product = await firstValueFrom(
      this.productsService.getProductById({
        id: productId,
      }),
    );

    if (product.amount > quantity) {
      throw new GrpcInvalidArgumentException('Quantity more than allowed');
    }

    await this.orm.cartItem.update({
      data: {
        quantity,
      },
      where: {
        productId_userId: {
          productId: product.id,
          userId,
        },
      },
    });

    return await this.getCartByUserId({ userId });
  }

  @UseFilters(PrismaClientExceptionFilter, GrpcToGrpcExceptionFilter)
  async removeProduct({ productId, userId }: RemoveProductRequestDto) {
    await this.orm.cartItem.delete({
      where: {
        productId_userId: {
          productId,
          userId,
        },
      },
    });

    return await this.getCartByUserId({ userId });
  }
}
