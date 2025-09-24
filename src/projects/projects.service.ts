import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private readonly repo: Repository<Project>) {}

  findAll(): Promise<Project[]> { return this.repo.find({ relations: ['members'] }); }

  async findOne(id: string): Promise<Project> {
    const p = await this.repo.findOne({ where: { id }, relations: ['members'] });
    if (!p) throw new NotFoundException('Project not found');
    return p;
  }

  create(project: Omit<Project, 'id'>): Promise<Project> { return this.repo.save(this.repo.create(project as any)); }

  async update(id: string, update: Partial<Omit<Project, 'id'>>): Promise<Project> {
    await this.repo.update({ id }, update as any);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> { await this.repo.delete({ id }); }
}

