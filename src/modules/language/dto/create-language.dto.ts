import { IsNumber, IsString } from 'class-validator';

export class CreateLanguageDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;
}
