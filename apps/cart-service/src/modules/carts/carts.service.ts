import { Inject, Injectable } from '@nestjs/common';
import { GrpcInvalidArgumentException } from '@repo/grpc/nest';
import { CartItemResponse } from '@repo/grpc/proto/carts';
import {
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from '@repo/grpc/proto/products';
import { firstValueFrom } from 'rxjs';
import { CartItemsRepository } from './cart-items.repository';
import {
  AddToCartRequestDto,
  GetCartRequestDto,
  RemoveCartRequestDto,
  RemoveFromCartRequestDto,
} from './dto/requests';
import { CartResponseDto } from './dto/responses';
import { CartItemEntity } from './entities';

@Injectable()
export class CartsService {
  constructor(
    @Inject(PRODUCTS_SERVICE_NAME)
    private readonly productsService: ProductsServiceClient,
    private readonly cartItemsRepository: CartItemsRepository,
  ) {}

  async removeCart({ userId }: RemoveCartRequestDto): Promise<void> {
    await this.cartItemsRepository.deleteMany({ userId });
  }

  getCartByItems(items: CartItemEntity[]): CartResponseDto {
    return {
      items: items,
      totalPrice: this.calculateTotalPrice(items),
      totalQuantity: this.calculateTotalQuantity(items),
    };
  }

  async getCart({ userId }: GetCartRequestDto): Promise<CartResponseDto> {
    const cartItems = await this.cartItemsRepository.findMany({
      where: {
        userId,
      },
    });

    return this.getCartByItems(cartItems);
  }

  async addToCart({
    productId,
    quantity,
    userId,
  }: AddToCartRequestDto): Promise<CartResponseDto> {
    const product = await firstValueFrom(
      this.productsService.getProductById({ id: productId }),
    );

    if (product.amount < quantity) {
      throw new GrpcInvalidArgumentException('Quantity more than allowed');
    }

    await this.cartItemsRepository.upsert({
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
  }: RemoveFromCartRequestDto): Promise<CartResponseDto> {
    await this.cartItemsRepository.delete({
      productId_userId: {
        productId,
        userId,
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
