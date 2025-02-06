import { Inject, Injectable } from '@nestjs/common';
import {
  CartResponse,
  CARTS_SERVICE_NAME,
  CartsServiceClient,
} from '@repo/grpc/proto/carts';
import {
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from '@repo/grpc/proto/products';
import { firstValueFrom, toArray } from 'rxjs';
import { AuthorizedUser } from '../auth/auth.interface';
import { AddToCartRequestDto } from './dto/requests';
import { CartResponseDto } from './dto/responses';

@Injectable()
export class CartsService {
  constructor(
    @Inject(CARTS_SERVICE_NAME)
    private readonly cartsService: CartsServiceClient,

    @Inject(PRODUCTS_SERVICE_NAME)
    private readonly productsService: ProductsServiceClient,
  ) {}

  async getCart(user: AuthorizedUser): Promise<CartResponseDto> {
    const cart = await firstValueFrom(
      this.cartsService.getCart({ userId: user.id }),
    );

    return await this.getCartWithProducts(cart);
  }

  async addToCart(
    productId: number,
    { quantity }: AddToCartRequestDto,
    user: AuthorizedUser,
  ): Promise<CartResponseDto> {
    const cart = await firstValueFrom(
      this.cartsService.addToCart({
        userId: user.id,
        productId,
        quantity,
      }),
    );

    return await this.getCartWithProducts(cart);
  }

  async removeFromCart(
    productId: number,
    user: AuthorizedUser,
  ): Promise<CartResponseDto> {
    const cart = await firstValueFrom(
      this.cartsService.removeFromCart({ userId: user.id, productId }),
    );

    return await this.getCartWithProducts(cart);
  }

  async getCartWithProducts(cart: CartResponse): Promise<CartResponseDto> {
    const products = cart.items.length
      ? await firstValueFrom(
          this.productsService
            .getProductsByIds({
              ids: cart.items.map((item) => item.productId),
            })
            .pipe(toArray()),
        )
      : [];

    return {
      ...cart,
      items: cart.items.map((item) => {
        return {
          ...item,
          product: products.find(({ id }) => id === item.productId)!,
        };
      }),
    };
  }
}
