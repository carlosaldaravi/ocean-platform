import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { Level } from '../../level/level.entity';
import { Sport } from '../../sport/sport.entity';
import { CourseType } from '../course-type.entity';

@Exclude()
export class ReadCourseDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @Type(type => Level)
  readonly level: Level;

  @Expose()
  @Type(type => Sport)
  readonly sport: Sport;

  @Expose()
  @Type(type => CourseType)
  readonly type: CourseType;
}
