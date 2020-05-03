import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadCourseTypeDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsNumber()
  readonly price: number;

  @Expose()
  @IsNumber()
  readonly discount: number;

  @Expose()
  @IsNumber()
  readonly maxStudents: number;
}
