export interface CartContextValue {
  quantity: number;
  loading: boolean;
  add(productId: number): Promise<void>;
}
