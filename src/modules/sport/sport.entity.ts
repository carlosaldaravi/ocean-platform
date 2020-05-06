import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Course } from '../course/course.entity';
import { Target } from '../target/target.entity';

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
    { eager: true },
  )
  target: Target;
}
