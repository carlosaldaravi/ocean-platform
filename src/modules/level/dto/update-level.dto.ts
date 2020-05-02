import { IsString } from 'class-validator';

export class UpdateLevelDto {
  @IsString()
  readonly name: string;
}
