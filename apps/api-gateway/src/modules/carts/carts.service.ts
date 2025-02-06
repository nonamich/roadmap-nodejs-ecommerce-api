import { Inject, Injectable } from '@nestjs/common';
import {
  CartResponse,
  CART_SERVICE_NAME,
  CartServiceClient,
} from '@repo/grpc/pb/cart';
import {
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
} from '@repo/grpc/pb/product';
import { firstValueFrom, toArray } from 'rxjs';
import { AuthorizedUser } from '../auth/auth.interface';
import { AddToCartRequestDto } from './dto/requests';
import { CartResponseDto } from './dto/responses';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_SERVICE_NAME)
    private readonly cartService: CartServiceClient,

    @Inject(PRODUCT_SERVICE_NAME)
    private readonly productService: ProductServiceClient,
  ) {}

  async getCart(user: AuthorizedUser): Promise<CartResponseDto> {
    const cart = await firstValueFrom(
      this.cartService.getCart({ userId: user.id }),
    );

    return await this.getCartWithProducts(cart);
  }

  async addToCart(
    productId: number,
    { quantity }: AddToCartRequestDto,
    user: AuthorizedUser,
  ): Promise<CartResponseDto> {
    const cart = await firstValueFrom(
      this.cartService.addToCart({
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
      this.cartService.removeFromCart({ userId: user.id, productId }),
    );

    return await this.getCartWithProducts(cart);
  }

  async getCartWithProducts(cart: CartResponse): Promise<CartResponseDto> {
    const products = cart.items.length
      ? await firstValueFrom(
          this.productService
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
