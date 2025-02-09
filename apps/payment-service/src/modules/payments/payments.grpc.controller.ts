import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@packages/grpc/nest';
import {
  PaymentServiceController,
  PaymentServiceControllerMethods,
} from '@packages/grpc/pb/payment';
import { CreateIntentRequestDto, GetIntentRequestDto } from './dto/requests';
import { IntentResponseDto } from './dto/responses';
import { StripeGrpcExceptionFilter } from './filters/stripe-grpc-exception.filter';
import { PaymentsService } from './payments.service';

@GrpcService()
@PaymentServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter, StripeGrpcExceptionFilter)
export class PaymentsGrpcController implements PaymentServiceController {
  constructor(private readonly service: PaymentsService) {}

  async createIntent(
    @GrpcPayload() dto: CreateIntentRequestDto,
  ): Promise<IntentResponseDto> {
    const intent = await this.service.createIntent(dto.amountInCent);

    return intent;
  }

  async getIntent(
    @GrpcPayload() dto: GetIntentRequestDto,
  ): Promise<IntentResponseDto> {
    return await this.service.getIntent(dto.intentId);
  }
}
