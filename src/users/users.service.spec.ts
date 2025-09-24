import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();
    service = moduleRef.get(UsersService);
  });

  it('findAll returns array', async () => {
    jest.spyOn<any, any>(service['repo'], 'find').mockResolvedValueOnce([]);
    await expect(service.findAll()).resolves.toEqual([]);
  });
});

