import { IsString, IsDate, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { StudentSize } from '../student-size.enum';
import { gender } from 'src/shared/user-gender.enum';

@Exclude()
export class ReadStudentDetailsDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly dni: string;

  @Expose()
  @IsString()
  readonly firstname: string;

  @Expose()
  @IsString()
  readonly lastname: string;

  @Expose()
  @IsString()
  readonly phone: string;

  @Expose()
  @IsString()
  readonly gender: gender;

  @Expose()
  @IsString()
  readonly city: string;

  @Expose()
  @IsString()
  readonly size: StudentSize;

  @Expose()
  @IsNumber()
  readonly weight: number;

  @Expose()
  @IsNumber()
  readonly footprint: number;

  @Expose()
  @IsDate()
  readonly dateBorn: Date;

  @Expose()
  @IsString()
  readonly knownWay: string;

  @Expose()
  @IsString()
  readonly comments: string;
}
