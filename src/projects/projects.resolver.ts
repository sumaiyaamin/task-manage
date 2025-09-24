import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => [Project])
  projects() { return this.projectsService.findAll(); }

  @Query(() => Project)
  project(@Args('id') id: string) { return this.projectsService.findOne(id); }

  @Mutation(() => Project)
  createProject(@Args('name') name: string) {
    return this.projectsService.create({ name, description: null as any, members: [] });
  }
}

