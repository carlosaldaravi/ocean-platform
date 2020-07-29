import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ReadCourseCalendarDto } from 'src/modules/calendar/dto/read-course-calendar.dto';
import { ReadSportDto } from 'src/modules/sport/dto';
import { ReadLevelDto } from 'src/modules/level/dto';
import { ReadCourseTypeDto } from '../type/dto';

export class CreateCourseDto {
  @Type(type => ReadCourseTypeDto)
  @ApiProperty({ type: ReadCourseTypeDto, description: 'ReadCourseTypeDto' })
  type: ReadCourseTypeDto;

  @Type(type => ReadLevelDto)
  @ApiProperty({ type: ReadLevelDto, description: 'ReadLevelDto' })
  level: ReadLevelDto;

  @Type(type => ReadSportDto)
  @ApiProperty({ type: ReadSportDto, description: 'ReadSportDto' })
  sport: ReadSportDto;

  @Type(type => ReadCourseCalendarDto)
  @ApiProperty({
    type: ReadCourseCalendarDto,
    description: 'ReadCourseCalendarDto',
  })
  calendar: ReadCourseCalendarDto;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  instructorId: number;

  @IsNumber()
  @ApiProperty({ type: [Number], description: 'number' })
  studentId: number[];
}
