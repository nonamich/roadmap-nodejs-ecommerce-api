import { Inject, Injectable } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BROKER_OPTIONS_TOKEN } from './broker.constants';
import { BrokerEventsMap } from './types/broker.events-map';
import { BrokerMicroserviceModuleOptions } from './types/broker.types';

@Injectable()
export class BrokerService extends ClientMqtt {
  constructor(
    @Inject(BROKER_OPTIONS_TOKEN) { url }: BrokerMicroserviceModuleOptions,
  ) {
    super({
      url,
    });
  }

  emit<K extends keyof BrokerEventsMap>(
    pattern: K,
    data: BrokerEventsMap[K],
  ): Observable<any> {
    return super.emit(pattern, data);
  }
}
