import { IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadLevelDto } from 'src/modules/level/dto';
import { ReadSportDto } from 'src/modules/sport/dto';
import { ReadCourseTypeDto } from '../type/dto';
import { ReadStudentDto } from 'src/modules/user/student/dto';
import { ReadInstructorDto } from 'src/modules/user/instructor/dto/read-instructor.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadCourseDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @Expose()
  @Type(type => ReadLevelDto)
  @ApiProperty({ type: ReadLevelDto, description: 'ReadLevelDto' })
  readonly level: ReadLevelDto;

  @Expose()
  @Type(type => ReadSportDto)
  @ApiProperty({ type: ReadSportDto, description: 'ReadSportDto' })
  readonly sport: ReadSportDto;

  @Expose()
  @Type(type => ReadCourseTypeDto)
  @ApiProperty({ type: ReadCourseTypeDto, description: 'ReadCourseTypeDto' })
  readonly type: ReadCourseTypeDto;

  @Expose()
  @Type(type => ReadStudentDto)
  @ApiProperty({ type: [ReadStudentDto], description: 'ReadStudentDto' })
  readonly courseStudents: ReadStudentDto[];

  @Expose()
  @Type(type => ReadInstructorDto)
  @ApiProperty({ type: [ReadInstructorDto], description: 'ReadInstructorDto' })
  readonly courseInstructors: ReadInstructorDto[];
}
