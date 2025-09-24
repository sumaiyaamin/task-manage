import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { topologicalSort } from '../utils/algorithms/topological-sort';
import { assignTasks } from '../utils/scheduling/assignment';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

class CreateTaskDto {
  @IsString() projectId: string;
  @IsString() title: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() assigneeId?: string;
  @IsEnum(['low','medium','high','urgent'] as any) priority: 'low'|'medium'|'high'|'urgent';
  @IsArray() dependencies: string[];
  @IsArray() skillsRequired: string[];
  @IsInt() @Min(1) estimateHours: number;
}

class UpdateTaskDto {
  @IsOptional() @IsString() projectId?: string;
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() assigneeId?: string;
  @IsOptional() @IsEnum(['low','medium','high','urgent'] as any) priority?: 'low'|'medium'|'high'|'urgent';
  @IsOptional() @IsArray() dependencies?: string[];
  @IsOptional() @IsArray() skillsRequired?: string[];
  @IsOptional() @IsInt() @Min(1) estimateHours?: number;
}

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> { return this.tasksService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> { return this.tasksService.findOne(id); }

  @Post()
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    const payload: Partial<Task> = {
      title: dto.title,
      description: dto.description,
      priority: dto.priority as any,
      dependencies: dto.dependencies,
      skillsRequired: dto.skillsRequired,
      estimateHours: dto.estimateHours,
      project: { id: dto.projectId } as any,
      assignee: dto.assigneeId ? ({ id: dto.assigneeId } as any) : null,
    };
    return this.tasksService.create(payload as any);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Promise<Task> {
    const payload: Partial<Task> = {
      title: dto.title,
      description: dto.description,
      priority: dto.priority as any,
      dependencies: dto.dependencies,
      skillsRequired: dto.skillsRequired,
      estimateHours: dto.estimateHours,
      project: dto.projectId ? ({ id: dto.projectId } as any) : undefined,
      assignee: dto.assigneeId ? ({ id: dto.assigneeId } as any) : undefined,
    };
    return this.tasksService.update(id, payload as any);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> { return this.tasksService.remove(id); }

  @Post('order/:projectId')
  async order(@Param('projectId') projectId: string) {
    const tasks = (await this.tasksService.findAll()).filter((t) => t.project.id === projectId);
    const nodes = tasks.map((t) => t.id);
    const edges = tasks.flatMap((t) => t.dependencies.map((d) => [d, t.id] as [string, string]));
    const order = topologicalSort(nodes, edges);
    return { order };
  }

  @Post('assign')
  assign(@Body() body: { users: Array<{ id: string; skills: string[]; availability: number }>; tasks: Array<{ id: string; priority: 'low' | 'medium' | 'high' | 'urgent'; skillsRequired: string[]; estimateHours: number }> }) {
    return assignTasks(body.users, body.tasks);
  }
}

