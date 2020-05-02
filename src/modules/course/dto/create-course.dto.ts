import { IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNumber()
  readonly id: number;
}
