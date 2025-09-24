import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface InMemoryUser {
  id: string;
  email: string;
  passwordHash: string;
  roles: string[];
}

const users: InMemoryUser[] = [
  {
    id: '1',
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('password', 10),
    roles: ['Admin'],
  },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const ok = bcrypt.compareSync(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { id: user.id, email: user.email, roles: user.roles };
  }

  async login(user: { id: string; email: string; roles: string[] }) {
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}

