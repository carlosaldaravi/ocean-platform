import { IsString } from 'class-validator';

export class UpdateSportDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
