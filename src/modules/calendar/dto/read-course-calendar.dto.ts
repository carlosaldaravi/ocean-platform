import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadCourseDto } from 'src/modules/course/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadCourseCalendarDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly courseId: number;

  @Expose()
  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, description: 'date' })
  readonly start: Date;

  @Expose()
  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, description: 'date' })
  readonly end: Date;

  @Expose()
  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, description: 'date' })
  readonly deletedAt: Date;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'string' })
  readonly comments: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly title: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: Boolean, description: 'boolean' })
  readonly allDay: boolean;

  @Expose()
  @Type(type => ReadCourseDto)
  @ApiProperty({ type: ReadCourseDto, description: 'ReadCourseDto' })
  readonly course: ReadCourseDto;
}
