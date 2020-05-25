import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { gender } from 'src/shared/user-gender.enum';

@Exclude()
export class ReadUserDetailsDto {
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
}
