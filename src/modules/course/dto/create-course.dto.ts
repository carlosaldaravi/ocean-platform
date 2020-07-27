import { IsNumber } from 'class-validator';
import { CourseCalendar } from '../../calendar/course-calendar.entity';
import { Type } from 'class-transformer';
import { CourseType } from '../course-type.entity';
import { Level } from 'src/modules/level/level.entity';
import { Sport } from 'src/modules/sport/sport.entity';

export class CreateCourseDto {
  @Type(type => CourseType)
  type: CourseType;

  @Type(type => Level)
  level: Level;

  @Type(type => Sport)
  sport: Sport;

  @Type(type => CourseCalendar)
  calendar: CourseCalendar;

  @IsNumber()
  instructorId: number;

  @IsNumber()
  studentId: number[];
}
