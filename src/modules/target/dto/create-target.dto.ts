import { IsNumber, IsString } from 'class-validator';

export class CreateTargetDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly level: string;

  @IsString()
  readonly description: string;
}
