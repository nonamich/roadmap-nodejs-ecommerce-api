/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './grpc-client.module-definition';

@Injectable()
export class GrpcClientService {
  public grpc!: any;

  constructor(
    @Inject() private client: ClientGrpc,
    @Inject(MODULE_OPTIONS_TOKEN) private options: typeof OPTIONS_TYPE,
  ) {}

  onModuleInit() {
    this.grpc = this.client.getService(this.options.packageName);
  }
}
