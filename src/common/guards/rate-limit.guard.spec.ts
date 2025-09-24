import { RateLimitGuard } from './rate-limit.guard';

describe('RateLimitGuard', () => {
  it('allows under threshold and blocks after', async () => {
    const store = new Map<string, number>();
    const cache: any = {
      get: async (k: string) => store.get(k) ?? 0,
      set: async (k: string, v: number) => { store.set(k, v); },
    };
    const guard = new RateLimitGuard(cache);
    const ctx: any = { switchToHttp: () => ({ getRequest: () => ({ ip: '1.1.1.1', route: { path: '/x' } }) }) };
    for (let i = 0; i < 30; i++) {
      await expect(guard.canActivate(ctx)).resolves.toBe(true);
    }
    await expect(guard.canActivate(ctx)).rejects.toBeDefined();
  });
});

