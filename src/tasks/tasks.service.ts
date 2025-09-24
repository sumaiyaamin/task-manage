import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}

  findAll(): Promise<Task[]> { return this.repo.find({ relations: ['project', 'assignee'] }); }

  async findOne(id: string): Promise<Task> {
    const t = await this.repo.findOne({ where: { id }, relations: ['project', 'assignee'] });
    if (!t) throw new NotFoundException('Task not found');
    return t;
  }

  create(task: Omit<Task, 'id'>): Promise<Task> { return this.repo.save(this.repo.create(task as any)) as unknown as Promise<Task>; }

  async update(id: string, update: Partial<Omit<Task, 'id'>>): Promise<Task> {
    await this.repo.update({ id }, update as any);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> { await this.repo.delete({ id }); }
}

