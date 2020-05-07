import {
  Entity,
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
import { CourseType } from './course-type.entity';
// import { CourseType } from './course-type.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Level,
    level => level.courses,
    { cascade: true },
  )
  @JoinColumn({ name: 'level_id' })
  level: Level;

  @ManyToOne(
    type => Sport,
    sport => sport.courses,
    { cascade: true },
  )
  @JoinColumn({ name: 'sport_id' })
  sport: Sport;

  @ManyToOne(
    type => CourseType,
    type => type.courses,
  )
  @JoinColumn({ name: 'type_id' })
  type: CourseType;

  @ManyToMany(
    type => User,
    student => student.studentCourses,
    { cascade: true },
  )
  students!: User[];

  @ManyToMany(
    type => User,
    instructor => instructor.instructorCourses,
    { cascade: true },
  )
  instructors!: User[];

  @OneToMany(
    type => CourseCalendar,
    calendar => calendar.course,
  )
  calendar: CourseCalendar[];
}
