import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<User> {
    const u = await this.repo.findOne({ where: { id } });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  create(user: Omit<User, 'id'>): Promise<User> {
    return this.repo.save(this.repo.create(user));
  }

  async update(id: string, update: Partial<Omit<User, 'id'>>): Promise<User> {
    await this.repo.update({ id }, update);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
}

