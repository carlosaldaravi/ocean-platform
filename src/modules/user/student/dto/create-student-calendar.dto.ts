import { IsNumber, IsDate, IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentCalendarDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  id: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  userId: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  typeId: number;

  @IsString()
  @ApiProperty({ type: String, description: 'string', default: 'Disponible' })
  title: string;

  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  start: Date;

  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  end: Date;

  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'boolean', default: true })
  allDay: boolean;
}
