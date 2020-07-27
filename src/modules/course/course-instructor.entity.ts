import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Course } from './course.entity';

@Entity('course_instructors')
export class CourseInstructor extends BaseEntity {
  @PrimaryColumn({
    name: 'instructor_id',
    primary: true,
    unique: false,
  })
  instructorId!: number;

  @PrimaryColumn({
    name: 'course_id',
    primary: true,
    unique: false,
  })
  courseId!: number;

  @Column({ default: false })
  cashed: boolean;

  @Column({ default: 30 })
  rateMoney: number;

  @ManyToOne(
    type => User,
    instructor => instructor.courseInstructors,
  )
  @JoinColumn({ name: 'instructor_id' })
  instructor!: User;

  @ManyToOne(
    type => Course,
    course => course.courseInstructors,
  )
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'date', name: 'deleted_at' })
  deletedAt: Date;
}
