import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsResolver } from './projects.resolver';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Project } from './project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsResolver, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  exports: [ProjectsService],
})
export class ProjectsModule {}

