import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@repo/grpc/proto/payments';
import { CreateIntentRequestDto, GetIntentRequestDto } from './dto/requests';
import { IntentResponseDto } from './dto/responses';
import { StripeGrpcExceptionFilter } from './filters/stripe-grpc-exception.filter';
import { PaymentsService } from './payments.service';

@GrpcService()
@PaymentsServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter, StripeGrpcExceptionFilter)
export class PaymentsGrpcController implements PaymentsServiceController {
  constructor(private readonly service: PaymentsService) {}

  async createIntent(
    @GrpcPayload() dto: CreateIntentRequestDto,
  ): Promise<IntentResponseDto> {
    const intent = await this.service.createIntent(dto);

    return intent;
  }

  async getIntent(
    @GrpcPayload() dto: GetIntentRequestDto,
  ): Promise<IntentResponseDto> {
    return await this.service.getIntent(dto);
  }
}
