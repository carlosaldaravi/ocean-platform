import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Level } from '../level/level.entity';
import { Sport } from '../sport/sport.entity';
import { User } from '../user/user.entity';
import { CourseCalendar } from '../calendar/course-calendar.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Level,
    level => level.courses,
  )
  @JoinColumn({ name: 'level_id' })
  level: Level;

  @ManyToOne(
    type => Sport,
    sport => sport.courses,
  )
  @JoinColumn({ name: 'sport_id' })
  sport: Sport;

  @ManyToMany(type => User)
  students!: User[];

  @ManyToMany(type => User)
  instructors!: User[];

  @OneToMany(
    type => CourseCalendar,
    calendar => calendar.course,
    { eager: true },
  )
  calendar: CourseCalendar[];
}
