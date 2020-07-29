import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserCalendarDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly user_id: number;

  @IsString()
  @ApiProperty({ type: Date, description: 'date' })
  readonly date: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, description: 'date' })
  readonly start_time: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, description: 'date' })
  readonly end_time: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'string' })
  readonly title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: Number, description: 'number' })
  readonly typeId: number;
}
