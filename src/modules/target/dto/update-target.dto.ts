import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Level } from '../../level/level.entity';

export class UpdateTargetDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly level: number;

  @IsString()
  readonly description: string;
}
