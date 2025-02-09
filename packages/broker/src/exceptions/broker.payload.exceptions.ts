import { RpcException } from '@nestjs/microservices';

export class BrokerPayloadException extends RpcException {
  constructor(public readonly messages: string[]) {
    super(messages);
  }
}
