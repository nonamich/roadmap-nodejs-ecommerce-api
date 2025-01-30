import type { CartResponseDto } from '~/api';

export interface CartContextValue extends CartResponseDto {
  loading: boolean;
  add(productId: number, addQuantity: number): Promise<void>;
  remove(productId: number): Promise<void>;
  refresh(): Promise<void>;
}
