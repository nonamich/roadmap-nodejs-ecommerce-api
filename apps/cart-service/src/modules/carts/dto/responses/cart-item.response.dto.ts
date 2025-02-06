import { CartItemResponse } from '@repo/grpc/proto/carts';

export class CartItemResponseDto implements CartItemResponse {
  quantity!: number;
  productId!: number;
  price!: number;
}
