import { Inject, Injectable } from '@nestjs/common';
import { CartResponse, CartsServiceClient } from '@repo/grpc/proto/carts';
import { ProductsServiceClient } from '@repo/grpc/proto/products';
import { firstValueFrom, toArray } from 'rxjs';
import { AuthorizedUser } from '../auth/auth.interface';
import { PRODUCTS_SERVICE_PROVIDER_TOKEN } from '../products/products.constants';
import { CARTS_SERVICE_PROVIDER_TOKEN } from './carts.constants';
import { AddToCartRequestDto } from './dto';

@Injectable()
export class CartsService {
  constructor(
    @Inject(CARTS_SERVICE_PROVIDER_TOKEN)
    private readonly cartsService: CartsServiceClient,

    @Inject(PRODUCTS_SERVICE_PROVIDER_TOKEN)
    private readonly productsService: ProductsServiceClient,
  ) {}

  async getCart(user: AuthorizedUser) {
    const cart = await firstValueFrom(
      this.cartsService.getCart({ userId: user.id }),
    );

    return await this.getCartWithProducts(cart);
  }

  async addToCart(
    productId: number,
    { quantity }: AddToCartRequestDto,
    user: AuthorizedUser,
  ) {
    const cart = await firstValueFrom(
      this.cartsService.addToCart({
        userId: user.id,
        productId,
        quantity,
      }),
    );

    return await this.getCartWithProducts(cart);
  }

  async removeFromCart(productId: number, user: AuthorizedUser) {
    const cart = await firstValueFrom(
      this.cartsService.removeFromCart({ userId: user.id, productId }),
    );

    return await this.getCartWithProducts(cart);
  }

  async getCartWithProducts(cart: CartResponse) {
    const products = cart.items.length ? await firstValueFrom(
      this.productsService
        .getProductsByIds({
          ids: cart.items.map((item) => item.productId),
        })
        .pipe(toArray()),
    ) : [];

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
