import { IsNumber, IsString, IsDate } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadUserCalendarDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly userId: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly typeId: number;

  @Expose()
  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  readonly start: Date;

  @Expose()
  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  readonly end: Date;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly title: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: Boolean, description: 'boolean' })
  readonly allDay: boolean;
}
