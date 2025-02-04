import { Inject, Injectable } from '@nestjs/common';
import { GrpcInvalidArgumentException } from '@repo/grpc/nest';
import { CartItemResponse } from '@repo/grpc/proto/carts';
import {
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from '@repo/grpc/proto/products';
import { firstValueFrom } from 'rxjs';
import { ORMService } from '~/modules/orm/orm.service';
import {
  AddToCartRequestDto,
  GetCartRequestDto,
  RemoveCartRequestDto,
  RemoveFromCartRequestDto,
} from './dto';
import { CartModel } from './model';

@Injectable()
export class CartsService {
  constructor(
    @Inject(PRODUCTS_SERVICE_NAME)
    private readonly productsService: ProductsServiceClient,
    private readonly orm: ORMService,
  ) {}

  async removeCart({ userId }: RemoveCartRequestDto): Promise<void> {
    await this.orm.cartItem.deleteMany({
      where: {
        userId,
      },
    });
  }

  async getCart({ userId }: GetCartRequestDto): Promise<CartModel> {
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

    return {
      items: cartItems,
      totalPrice: this.calculateTotalPrice(cartItems),
      totalQuantity: this.calculateTotalQuantity(cartItems),
    };
  }

  async addToCart({
    productId,
    quantity,
    userId,
  }: AddToCartRequestDto): Promise<CartModel> {
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

  async removeFromCart({
    productId,
    userId,
  }: RemoveFromCartRequestDto): Promise<CartModel> {
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

  calculateTotalPrice(items: CartItemResponse[]): number {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  calculateTotalQuantity(items: CartItemResponse[]): number {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }
}
