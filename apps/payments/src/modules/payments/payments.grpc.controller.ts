import { Controller, UseFilters } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  GrpcToGrpcExceptionFilter,
  GrpcValidationPipe,
} from '@packages/grpc/nest';
import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@packages/grpc/proto/payments';
import { CreateIntentRequestDto, GetIntentRequestDto } from './dto';
import { PaymentsService } from './payments.service';

@Controller()
@PaymentsServiceControllerMethods()
export class PaymentsGrpcController implements PaymentsServiceController {
  constructor(private readonly service: PaymentsService) {}

  @UseFilters(GrpcToGrpcExceptionFilter)
  async createIntent(@Payload(GrpcValidationPipe) dto: CreateIntentRequestDto) {
    return await this.service.createIntent(dto);
  }

  @UseFilters(GrpcToGrpcExceptionFilter)
  async getIntent(@Payload(GrpcValidationPipe) dto: GetIntentRequestDto) {
    return await this.service.getIntent(dto);
  }
}
