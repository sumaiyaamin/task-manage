import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

class CreateProjectDto {
  @IsString() @MinLength(2) name: string;
  @IsOptional() @IsString() description?: string;
  @IsArray() members: string[];
}

class UpdateProjectDto {
  @IsOptional() @IsString() @MinLength(2) name?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsArray() members?: string[];
}

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> { return this.projectsService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> { return this.projectsService.findOne(id); }

  @Post()
  create(@Body() dto: CreateProjectDto): Promise<Project> {
    const payload: Partial<Project> = {
      name: dto.name,
      description: dto.description,
      members: (dto.members || []).map((id) => ({ id } as any)),
    };
    return this.projectsService.create(payload as any);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto): Promise<Project> {
    const payload: Partial<Project> = {
      name: dto.name,
      description: dto.description,
      members: dto.members ? dto.members.map((m) => ({ id: m } as any)) : undefined,
    };
    return this.projectsService.update(id, payload as any);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> { return this.projectsService.remove(id); }
}

