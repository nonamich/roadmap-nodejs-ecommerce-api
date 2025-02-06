import { DynamicModule, Module } from '@nestjs/common';
import { BROKER_OPTIONS_TOKEN } from './broker.constants';
import { BrokerService } from './broker.service';
import { BrokerMicroserviceModuleOptions } from './types/broker.types';

type ConfigModuleOptions = {
  useFactory: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) =>
    | Promise<BrokerMicroserviceModuleOptions>
    | BrokerMicroserviceModuleOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[];
};

export const SERVICE_TOKEN = Symbol('SERVICE_TOKEN');

@Module({})
export class BrokerModule {
  static registerAsync({
    useFactory,
    inject,
  }: ConfigModuleOptions): DynamicModule {
    return {
      module: this,
      exports: [BrokerService],
      providers: [
        {
          provide: BROKER_OPTIONS_TOKEN,
          inject,
          useFactory,
        },
        BrokerService,
      ],
    };
  }
}
