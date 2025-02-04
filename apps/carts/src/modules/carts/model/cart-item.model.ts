import { CartItemResponse } from '@repo/grpc/proto/carts';

export class CartItemModel implements CartItemResponse {
  quantity!: number;
  productId!: number;
  price!: number;
}
