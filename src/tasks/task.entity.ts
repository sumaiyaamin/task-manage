import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../projects/project.entity';
import { User } from '../users/user.entity';

@ObjectType()
@Entity('tasks')
export class Task {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ default: 'medium' })
  priority: 'low' | 'medium' | 'high' | 'urgent';

  @Field(() => [String])
  @Column('simple-array', { default: '' })
  skillsRequired: string[];

  @Field(() => [String])
  @Column('simple-array', { default: '' })
  dependencies: string[];

  @Field({ nullable: true })
  @Column({ type: 'int', default: 1 })
  estimateHours: number;

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  project: Project;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.assignedTasks, { nullable: true })
  assignee?: User | null;
}

