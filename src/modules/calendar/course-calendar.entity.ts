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

  @PrimaryColumn()
  start: Date;

  @Column()
  end: Date;

  @Column({ default: false })
  allDay: boolean;

  @Column({ default: 'Curso' })
  title: string;

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
