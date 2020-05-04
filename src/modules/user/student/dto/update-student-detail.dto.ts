import {
  IsEmail,
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';
import { StudentSize } from '../student-size.enum';
import { gender } from 'src/shared/user-gender.enum';

export class UpdateStudentDetailsDto {
  @IsString()
  readonly dni: string;

  @IsString()
  @IsOptional()
  readonly firstname: string;

  @IsString()
  @IsOptional()
  readonly lastname: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly city: string;

  @IsString()
  @IsOptional()
  readonly size: StudentSize;

  @IsNumber()
  @IsOptional()
  readonly weight: number;

  @IsNumber()
  @IsOptional()
  readonly footprint: number;

  @IsDate()
  @IsOptional()
  readonly dateBorn: Date;

  @IsNumber()
  @IsOptional()
  readonly comments: number;

  @IsString()
  @IsOptional()
  readonly gender: gender;
}
