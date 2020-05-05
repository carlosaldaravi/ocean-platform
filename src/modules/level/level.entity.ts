import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { status } from '../../shared/entity-status.enum';
import { Target } from '../target/target.entity';
import { Course } from '../course/course.entity';

@Entity('levels')
export class Level extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: string;

  @OneToMany(
    type => Target,
    target => target.level,
  )
  target: Target;

  @OneToMany(
    type => Course,
    course => course.level,
  )
  courses: Course[];

  @OneToMany(
    type => User,
    user => user.level,
  )
  users: User[];
}
