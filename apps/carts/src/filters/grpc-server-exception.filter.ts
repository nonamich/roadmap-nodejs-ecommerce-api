import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(Error)
export class CustomGrpcServerExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: Error): Observable<any> {
    return throwError(() => exception);
  }
}
