import { IsNumber, IsString } from 'class-validator';

export class CreateSportDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
