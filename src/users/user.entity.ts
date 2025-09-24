import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../projects/project.entity';
import { Task } from '../tasks/task.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [String])
  @Column('simple-array', { default: '' })
  roles: string[];

  @Field(() => [String])
  @Column('simple-array', { default: '' })
  skills: string[];

  @Field()
  @Column({ type: 'int', default: 40 })
  availability: number;

  @Field(() => [Task], { nullable: true })
  @OneToMany(() => Task, (task) => task.assignee)
  assignedTasks?: Task[];

  @Field(() => [Project], { nullable: true })
  @ManyToMany(() => Project, (project) => project.members)
  projects?: Project[];
}

