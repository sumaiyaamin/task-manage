import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      providers: [AuthService, { provide: JwtService, useValue: { signAsync: async () => 'token' } }],
    }).compile();
    service = mod.get(AuthService);
  });

  it('validates default admin user', async () => {
    const user = await service.validateUser('admin@example.com', 'password');
    expect(user.email).toBe('admin@example.com');
  });
});

