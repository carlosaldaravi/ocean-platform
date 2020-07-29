import { IsNumber, IsDate, IsBoolean, IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadStudentCalendarDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  id: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  userId: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  typeId: number;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string', default: 'Disponible' })
  title: string;

  @Expose()
  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  start: Date;

  @Expose()
  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  end: Date;

  @Expose()
  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'boolean', default: true })
  allDay: boolean;
}
