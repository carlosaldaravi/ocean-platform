import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Course } from '../course/course.entity';

@Entity('course_calendar')
export class CourseCalendar extends BaseEntity {
  @PrimaryColumn({ name: 'course_id' })
  courseId: number;

  @PrimaryColumn({ type: 'date', unique: true })
  date: Date;

  @Column('time', { nullable: true })
  start_time: Date;

  @Column('time', { nullable: true })
  end_time: Date;

  @Column({ nullable: true })
  comments: string;

  @ManyToOne(
    type => Course,
    course => course.calendar,
  )
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
