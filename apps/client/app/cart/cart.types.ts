import type { CartResponseEntity } from '~/api';

export interface CartContextValue extends CartResponseEntity {
  loading: boolean;
  add(productId: number, addQuantity: number): Promise<void>;
  remove(productId: number): Promise<void>;
  refresh(): Promise<void>;
}
