import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task])
  tasks() { return this.tasksService.findAll(); }

  @Query(() => Task)
  task(@Args('id') id: string) { return this.tasksService.findOne(id); }

  @Mutation(() => Task)
  createTask(@Args('title') title: string) {
    return this.tasksService.create({ title, description: null as any, priority: 'medium' as any, skillsRequired: [], dependencies: [], estimateHours: 1, project: { id: '' } as any, assignee: null });
  }
}

