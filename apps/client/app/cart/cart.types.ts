export interface CartContextValue {
  quantity: number;
  loading: boolean;
  add(productId: number, addQuantity: number): Promise<void>;
  update(productId: number, updateQuantity: number): Promise<void>;
  remove(productId: number): Promise<void>;
}
