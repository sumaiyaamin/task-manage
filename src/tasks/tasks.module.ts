import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksResolver } from './tasks.resolver';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TasksResolver, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  exports: [TasksService],
})
export class TasksModule {}

