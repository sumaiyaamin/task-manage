import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const label = req ? `${req.method} ${req.url}` : context.getClass().name;
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        // eslint-disable-next-line no-console
        console.log(`[${label}] ${Date.now() - start}ms`);
      }),
    );
  }
}

