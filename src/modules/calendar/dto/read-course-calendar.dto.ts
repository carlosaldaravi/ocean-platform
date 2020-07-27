import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadCourseDto } from 'src/modules/course/dto';

@Exclude()
export class ReadCourseCalendarDto {
  @Expose()
  @IsNumber()
  readonly courseId: number;

  @Expose()
  @IsDate()
  @IsOptional()
  readonly start: Date;

  @Expose()
  @IsDate()
  @IsOptional()
  readonly end: Date;

  @Expose()
  @IsDate()
  @IsOptional()
  readonly deletedAt: Date;

  @Expose()
  @IsString()
  @IsOptional()
  readonly comments: string;

  @Expose()
  @IsString()
  readonly title: string;

  @Expose()
  @IsString()
  readonly allDay: boolean;

  @Expose()
  @Type(type => ReadCourseDto)
  readonly course: ReadCourseDto;
}
