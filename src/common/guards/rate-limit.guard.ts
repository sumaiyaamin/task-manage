import { CanActivate, ExecutionContext, Injectable, TooManyRequestsException } from '@nestjs/common';
import { Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = `rate:${req.ip}:${req.route?.path || 'global'}`;
    const current = (await this.cache.get<number>(key)) || 0;
    if (current >= 30) throw new TooManyRequestsException('Rate limit exceeded');
    await this.cache.set(key, current + 1, 60_000);
    return true;
  }
}

