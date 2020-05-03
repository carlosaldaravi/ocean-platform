import { IsString, IsNumber } from 'class-validator';

export class UpdateCourseTypeDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly discount: number;

  @IsNumber()
  readonly maxStudents: number;
}
