import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProductsRabbitmqController {
  @EventPattern({ cmd: 'crdeated' })
  sum(@Payload() userId: number): number {
    return userId;
  }
}
