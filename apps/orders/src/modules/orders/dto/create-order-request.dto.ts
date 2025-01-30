import { CreateOrderRequest } from '@packages/grpc/proto/orders';
import { IsInt, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrderRequestDto implements CreateOrderRequest {
  @IsInt()
  userId!: number;

  @IsString()
  address!: string;

  @IsPhoneNumber()
  phone!: string;
}
