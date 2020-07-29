import {
  IsEmail,
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';
import { StudentSize } from '../student-size.enum';
import { gender } from '../../../../shared/user-gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDetailsDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly dni: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'string' })
  readonly firstname: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'string' })
  readonly lastname: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'string' })
  readonly phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'string' })
  readonly city: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ['XS', 'S', 'M', 'L', 'XL'] })
  readonly size: StudentSize;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, description: 'number' })
  readonly weight: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, description: 'number' })
  readonly footprint: number;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, description: 'date' })
  readonly dateBorn: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, description: 'number' })
  readonly comments: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ['MALE', 'FEMALE'] })
  readonly gender: gender;
}
