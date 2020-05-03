import { IsNumber, IsString } from 'class-validator';
import { CourseCalendar } from '../../calendar/course-calendar.entity';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  test: string;

  @IsNumber()
  typeId: number;

  @IsNumber()
  levelId: number;

  @IsNumber()
  sportId: number;

  @IsNumber()
  instructorId: number;

  @IsNumber()
  studentId: number[];
}
