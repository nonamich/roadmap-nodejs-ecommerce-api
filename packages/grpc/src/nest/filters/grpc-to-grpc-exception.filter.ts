import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';
import { createGrpcExceptionObject, GrpcExceptionMessage } from '../utils';

@Catch(Error)
export class GrpcToGrpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    if ('details' in error && typeof error.details === 'string') {
      try {
        const details: GrpcExceptionMessage = JSON.parse(error.details);

        return super.catch(
          new RpcException(
            createGrpcExceptionObject(details.message, details.code),
          ),
          host,
        );
      } catch {
        /* empty */
      }
    }

    return throwError(() => error);
  }
}
