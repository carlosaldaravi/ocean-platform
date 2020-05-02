import { IsString } from 'class-validator';

export class UpdateLanguageDto {
  @IsString()
  readonly name: string;
}
