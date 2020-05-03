import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  PrimaryColumn,
  ManyToOne,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Course } from '../course/course.entity';

@Entity('course_type')
export class CourseType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 0 })
  discount: number;

  @Column({ nullable: false })
  maxStudents: number;

  @OneToMany(
    type => Course,
    course => course.type,
  )
  courses: Course[];
}
