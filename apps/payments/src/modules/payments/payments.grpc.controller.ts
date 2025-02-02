import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@repo/grpc/proto/payments';
import { CreateIntentRequestDto, GetIntentRequestDto } from './dto';
import { PaymentsService } from './payments.service';

@GrpcService()
@PaymentsServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter)
export class PaymentsGrpcController implements PaymentsServiceController {
  constructor(private readonly service: PaymentsService) {}

  async createIntent(@GrpcPayload() dto: CreateIntentRequestDto) {
    return await this.service.createIntent(dto);
  }

  async getIntent(@GrpcPayload() dto: GetIntentRequestDto) {
    return await this.service.getIntent(dto);
  }
}
