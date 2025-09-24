import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

describe('TasksService', () => {
  let service: TasksService;
  let repo: Repository<Task>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useClass: Repository },
      ],
    }).compile();
    service = moduleRef.get(TasksService);
    repo = moduleRef.get(getRepositoryToken(Task));
  });

  it('findAll returns list', async () => {
    jest.spyOn(repo, 'find').mockResolvedValueOnce([]);
    await expect(service.findAll()).resolves.toEqual([]);
  });
});

