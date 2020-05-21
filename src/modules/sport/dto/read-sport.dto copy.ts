import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { SportLevel } from '../sport-level.entity';
import { Level } from 'src/modules/level/level.entity';

@Exclude()
export class ReadSportLevelDto {
  @Expose()
  @IsNumber()
  readonly sportId: number;

  @Expose()
  @IsNumber()
  readonly levelId: number;

  @Expose()
  @IsNumber()
  readonly order: number;

  @Expose()
  @Type(type => Level)
  readonly level: Level;
}
