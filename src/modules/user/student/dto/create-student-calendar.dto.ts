import { IsNumber, IsDate, IsBoolean, IsString } from 'class-validator';

export class CreateStudentCalendarDto {
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  typeId: number;

  @IsString()
  title: string;

  @IsDate()
  start: Date;

  @IsDate()
  end: Date;

  @IsBoolean()
  allDay: boolean;
}
