import { IsNumber, IsString } from 'class-validator';

export class CreateLevelDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;
}
