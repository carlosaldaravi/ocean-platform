import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateCalendarDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly date: Date;

  @IsDate()
  readonly start_time: Date;

  @IsDate()
  readonly end_time: Date;

  @IsString()
  readonly comments: string;
}
