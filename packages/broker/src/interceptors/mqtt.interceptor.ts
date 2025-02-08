import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class MqttInterceptor implements NestInterceptor {
  static logger = new Logger(MqttInterceptor.name);

  intercept(
    _context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> | Promise<Observable<unknown>> {
    return next.handle().pipe(
      catchError((err: Error) => {
        MqttInterceptor.logger.error(err);

        return throwError(() => err);
      }),
    );
  }
}
