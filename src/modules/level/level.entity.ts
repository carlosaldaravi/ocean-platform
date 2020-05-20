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
import { UserSport } from '../user/user-sports.entity';

@Entity('levels')
export class Level extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  name: string;

  @Column()
  order: number;

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
    type => UserSport,
    userSport => userSport.level,
  )
  userSport: UserSport[];
}
