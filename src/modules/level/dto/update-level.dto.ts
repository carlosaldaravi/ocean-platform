import { IsString, IsNumber } from 'class-validator';

export class UpdateLevelDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly order: number;
}
