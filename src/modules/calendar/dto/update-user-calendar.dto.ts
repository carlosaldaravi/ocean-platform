import { IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserCalendarDto {
  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  readonly date: Date;

  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  readonly start_time: Date;

  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  readonly end_time: Date;

  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly title: string;
}
