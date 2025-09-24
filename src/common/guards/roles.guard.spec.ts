import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  it('allows when no roles metadata', () => {
    const guard = new RolesGuard({ getAllAndOverride: () => undefined } as any as Reflector);
    const ctx = { switchToHttp: () => ({ getRequest: () => ({ user: {} }) }), getHandler: () => ({}), getClass: () => ({}) } as any;
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('denies without matching role', () => {
    const guard = new RolesGuard({ getAllAndOverride: () => ['Admin'] } as any as Reflector);
    const ctx = { switchToHttp: () => ({ getRequest: () => ({ user: { roles: ['Member'] } }) }), getHandler: () => ({}), getClass: () => ({}) } as any;
    expect(guard.canActivate(ctx)).toBe(false);
  });
});

