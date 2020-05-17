import { IsNumber, IsString, IsDate } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadUserDto } from '../../user/dto';

@Exclude()
export class ReadUserCalendarDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsNumber()
  readonly userId: number;

  @Expose()
  @IsNumber()
  readonly typeId: number;

  @Expose()
  @IsDate()
  readonly start: Date;

  @Expose()
  @IsDate()
  readonly end: Date;

  @Expose()
  @IsString()
  readonly title: string;

  @Expose()
  @IsString()
  readonly allDay: boolean;
}
