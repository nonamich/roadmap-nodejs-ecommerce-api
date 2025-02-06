import { CartItemResponse } from '@repo/grpc/pb/cart';

export class CartItemResponseDto implements CartItemResponse {
  quantity!: number;
  productId!: string;
  price!: number;
}
