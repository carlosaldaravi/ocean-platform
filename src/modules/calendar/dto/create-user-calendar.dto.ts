import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateUserCalendarDto {
  @IsNumber()
  readonly user_id: number;

  @IsString()
  readonly date: Date;

  @IsDate()
  @IsOptional()
  readonly start_time: Date;

  @IsDate()
  @IsOptional()
  readonly end_time: Date;

  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly typeId: number;
}
