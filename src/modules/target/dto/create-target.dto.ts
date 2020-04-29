import { IsNumber, IsString } from 'class-validator';
import { Level } from '../../level/level.entity';

export class CreateTargetDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly level: Level;

  @IsString()
  readonly description: string;
}
