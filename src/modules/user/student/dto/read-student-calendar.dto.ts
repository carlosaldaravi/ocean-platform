import { IsNumber, IsDate, IsBoolean, IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ReadStudentCalendarDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsNumber()
  userId: number;

  @Expose()
  @IsNumber()
  typeId: number;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsDate()
  start: Date;

  @Expose()
  @IsDate()
  end: Date;

  @Expose()
  @IsBoolean()
  allDay: boolean;
}
