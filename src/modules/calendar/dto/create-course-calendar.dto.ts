import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateCourseCalendarDto {
  @IsNumber()
  course_id: number;

  @IsString()
  readonly date: Date;

  @IsDate()
  @IsOptional()
  readonly start_time: Date;

  @IsDate()
  @IsOptional()
  readonly end_time: Date;

  @IsString()
  @IsOptional()
  readonly comments: string;
}
