import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = `rate:${req.ip}:${req.route?.path || 'global'}`;
    const current = (await this.cache.get<number>(key)) || 0;
    if (current >= 30) throw new HttpException('Rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
    await this.cache.set(key, current + 1, 60);
    return true;
  }
}

