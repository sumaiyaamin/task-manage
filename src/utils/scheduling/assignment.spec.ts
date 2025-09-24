import { assignTasks } from './assignment';

describe('assignment', () => {
  it('assigns tasks to capable and available users', () => {
    const users = [
      { id: 'u1', skills: ['js'], availability: 8 },
      { id: 'u2', skills: ['js', 'ts'], availability: 16 },
    ];
    const tasks = [
      { id: 't1', priority: 'urgent', skillsRequired: ['ts'], estimateHours: 4 },
      { id: 't2', priority: 'high', skillsRequired: ['js'], estimateHours: 8 },
    ];
    const result = assignTasks(users as any, tasks as any);
    expect(result.t1).toBe('u2');
    expect(['u1', 'u2']).toContain(result.t2!);
  });
});

