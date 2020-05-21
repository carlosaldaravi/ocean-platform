import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Course } from '../course/course.entity';
import { Target } from '../target/target.entity';
import { UserSport } from '../user/user-sports.entity';
import { SportLevel } from './sport-level.entity';

@Entity('sports')
export class Sport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(
    type => Course,
    course => course.sport,
  )
  courses: Course[];

  @OneToMany(
    type => Target,
    target => target.sport,
  )
  target: Target;

  @OneToMany(
    type => UserSport,
    userSport => userSport.sport,
  )
  userSport: UserSport;

  @OneToMany(
    type => SportLevel,
    sportLevel => sportLevel.sport,
    { eager: true },
  )
  @JoinTable({ name: 'sport_levels' })
  sportLevel: SportLevel[];
}
