import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseCalendarDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  course_id: number;

  @IsString()
  @ApiProperty({ type: Date, description: 'date' })
  readonly date: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, description: 'date' })
  readonly start_time: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, description: 'date' })
  readonly end_time: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'string' })
  readonly comments: string;
}
