import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  CreateResponse,
  GetIntentResponse,
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

  async createIntent(
    @GrpcPayload() dto: CreateIntentRequestDto,
  ): Promise<CreateResponse> {
    const intent = await this.service.createIntent(dto);

    return { intentId: intent.id };
  }

  async getIntent(
    @GrpcPayload() dto: GetIntentRequestDto,
  ): Promise<GetIntentResponse> {
    return await this.service.getIntent(dto);
  }
}
