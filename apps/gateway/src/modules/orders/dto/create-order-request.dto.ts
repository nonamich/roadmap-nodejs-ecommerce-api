import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderRequest } from '@packages/grpc/proto/orders';
import { IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrderRequestDto
  implements Omit<CreateOrderRequest, 'userId'>
{
  @ApiProperty()
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty()
  @IsString()
  address!: string;
}
