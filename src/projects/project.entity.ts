import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Task } from '../tasks/task.entity';

@ObjectType()
@Entity('projects')
export class Project {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  members?: User[];

  @Field(() => [Task], { nullable: true })
  @OneToMany(() => Task, (task) => task.project)
  tasks?: Task[];
}

