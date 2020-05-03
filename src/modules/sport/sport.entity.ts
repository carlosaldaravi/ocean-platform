import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { status } from '../../shared/entity-status.enum';
import { Course } from '../course/course.entity';

@Entity('sports')
export class Sport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: string;

  @OneToMany(
    type => Course,
    course => course.sport,
  )
  courses: Course[];

  @ManyToMany(type => User)
  users!: User[];
}
