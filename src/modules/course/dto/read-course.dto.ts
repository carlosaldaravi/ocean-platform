import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadCourseDto {
  @Expose()
  @IsNumber()
  readonly id: number;
}
