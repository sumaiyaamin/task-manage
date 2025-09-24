import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  it('passes through and logs', (done) => {
    const interceptor = new LoggingInterceptor();
    const ctx: any = { switchToHttp: () => ({ getRequest: () => ({ method: 'GET', url: '/' }) }) };
    const next: any = { handle: () => ({ pipe: (tap: any) => { tap.next?.(); done(); } }) };
    interceptor.intercept(ctx, next as any);
  });
});

