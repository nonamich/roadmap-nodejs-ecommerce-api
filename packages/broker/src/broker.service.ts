import { Inject, Injectable } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BROKER_OPTIONS_TOKEN } from './broker.constants';
import { BrokerEventsMap } from './broker.events-map';
import { BrokerMicroserviceModuleOptions } from './types/broker.types';

@Injectable()
export class BrokerService extends ClientMqtt {
  // private logger = new Logger(this.constructor.name);

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
    const observer = super.emit(pattern, data);

    this.logger.log(`${pattern} was emitted`);
    this.logger.log(data);

    return observer;
  }
}
