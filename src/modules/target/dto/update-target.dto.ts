import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTargetDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly level: string;

  @IsString()
  readonly description: string;
}
