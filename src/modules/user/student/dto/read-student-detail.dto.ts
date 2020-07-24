import { IsString, IsDate } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { StudentSize } from '../student-size.enum';
import { gender } from 'src/shared/user-gender.enum';

@Exclude()
export class ReadStudentDetailsDto {
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
  @IsDate()
  readonly dateBorn: string;

  @Expose()
  @IsString()
  readonly city: string;

  @Expose()
  @IsString()
  readonly size: StudentSize;

  @Expose()
  @IsString()
  readonly gender: gender;
}
