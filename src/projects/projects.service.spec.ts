import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repo: Repository<Project>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: getRepositoryToken(Project), useClass: Repository },
      ],
    }).compile();
    service = moduleRef.get(ProjectsService);
    repo = moduleRef.get(getRepositoryToken(Project));
  });

  it('create delegates to repository', async () => {
    const created = { id: '1', name: 'P', description: null, members: [] } as any;
    jest.spyOn(repo, 'create').mockReturnValue(created);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(created);
    await expect(service.create({ name: 'P', description: null as any, members: [] })).resolves.toEqual(created);
  });
});

