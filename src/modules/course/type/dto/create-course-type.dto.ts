import { IsNumber, IsString } from 'class-validator';

export class CreateCourseTypeDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly discount: number;

  @IsNumber()
  readonly maxStudents: number;
}
