import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { CalendarType } from './calendar-type.entity';

@Entity('course_calendar')
export class CourseCalendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @PrimaryColumn({ name: 'course_id' })
  // courseId: number;

  @PrimaryColumn({ type: 'date' })
  date: Date;

  @Column({ name: 'type_id', nullable: false })
  typeId: number;

  @Column('time', { nullable: true })
  start_time: Date;

  @Column('time', { nullable: true })
  end_time: Date;

  @Column({ nullable: true })
  comments: string;

  // @ManyToOne(
  //   type => Course,
  //   course => course.date,
  //   { primary: true },
  // )
  // @JoinColumn({ name: 'course_id' })
  // course: Course;

  @OneToOne(
    type => CalendarType,
    type => type.calendar,
  )
  @JoinColumn({ name: 'type_id' })
  type: CalendarType;
}
