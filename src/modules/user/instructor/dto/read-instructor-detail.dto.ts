import { IsString, IsDate } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadInstructorDetailsDto {
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
}
