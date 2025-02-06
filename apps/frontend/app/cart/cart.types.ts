import type { CartResponseDto } from '~/api';

export interface CartContextValue extends CartResponseDto {
  loading: boolean;
  add(productId: string, addQuantity: number): Promise<void>;
  remove(productId: string): Promise<void>;
  refresh(): Promise<void>;
}
