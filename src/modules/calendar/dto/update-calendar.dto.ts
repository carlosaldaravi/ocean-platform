import { IsString, IsDate } from 'class-validator';

export class UpdateCalendarDto {
  @IsDate()
  readonly date: Date;

  @IsDate()
  readonly start_time: Date;

  @IsDate()
  readonly end_time: Date;

  @IsString()
  readonly comments: string;
}
