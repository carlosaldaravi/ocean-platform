import { IsNumber, IsString, IsDate } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadUserDto } from '../../user/dto';

@Exclude()
export class ReadUserCalendarDto {
  @Expose()
  @IsNumber()
  readonly userId: number;

  @Expose()
  @IsDate()
  readonly date: Date;

  @Expose()
  @IsDate()
  readonly start_time: Date;

  @Expose()
  @IsDate()
  readonly end_time: Date;

  @Expose()
  @IsString()
  readonly comments: string;
}
