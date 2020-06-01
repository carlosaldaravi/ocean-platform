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

@Entity('course_students')
export class CourseStudent extends BaseEntity {
  @PrimaryColumn({
    name: 'student_id',
    primary: true,
    unique: false,
  })
  studentId!: number;

  @PrimaryColumn({
    name: 'course_id',
    primary: true,
    unique: false,
  })
  courseId!: number;

  @Column({ default: false })
  paid: boolean;

  @ManyToOne(
    type => User,
    student => student.courseStudents,
  )
  @JoinColumn({ name: 'student_id' })
  student!: User;

  @ManyToOne(
    type => Course,
    course => course.courseStudents,
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
