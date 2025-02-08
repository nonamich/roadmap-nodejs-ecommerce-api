import { Injectable } from '@nestjs/common';

type Item = {
  price: number;
  quantity: number;
};

@Injectable()
export class PriceService {
  calculateTotalPrice(items: Item[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  priceToCent(price: number): number {
    return Math.ceil(price * 100);
  }
}
