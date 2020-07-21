import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadLevelDto } from 'src/modules/level/dto';
import { ReadSportDto } from 'src/modules/sport/dto';
import { ReadCourseTypeDto } from '../type/dto';
import { ReadStudentDto } from 'src/modules/user/student/dto';
import { ReadInstructorDto } from 'src/modules/user/instructor/dto/read-instructor.dto';

@Exclude()
export class ReadCourseDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @Type(type => ReadLevelDto)
  readonly level: ReadLevelDto;

  @Expose()
  @Type(type => ReadSportDto)
  readonly sport: ReadSportDto;

  @Expose()
  @Type(type => ReadCourseTypeDto)
  readonly type: ReadCourseTypeDto;

  @Expose()
  @Type(type => ReadStudentDto)
  readonly courseStudents: ReadStudentDto[];

  @Expose()
  @Type(type => ReadInstructorDto)
  readonly courseInstructors: ReadInstructorDto[];
}
