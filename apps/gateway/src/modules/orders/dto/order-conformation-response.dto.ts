import { ApiProperty } from '@nestjs/swagger';
import { OrderResponseDto } from './order-response.dto';

export class OrderConformationResponseDto extends OrderResponseDto {
  @ApiProperty()
  indentClientSecret!: string;
}
