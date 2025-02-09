import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BrokerPayloadException } from '../exceptions';

@Catch(BrokerPayloadException)
export class BrokerPayloadFilter extends BaseRpcExceptionFilter {
  private logger = new Logger(this.constructor.name);

  catch(
    exception: BrokerPayloadException,
    host: ArgumentsHost,
  ): Observable<any> {
    this.logger.error(exception.messages);

    return super.catch(exception, host);
  }
}
