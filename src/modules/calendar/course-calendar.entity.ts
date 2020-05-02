import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  PrimaryColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { CalendarType } from './calendar-type.entity';
import { Course } from '../course/course.entity';

@Entity('course_calendar')
export class CourseCalendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ name: 'course_id' })
  courseId: number;

  @PrimaryColumn({ type: 'date' })
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
    { primary: true },
  )
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
