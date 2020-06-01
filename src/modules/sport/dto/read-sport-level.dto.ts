import { IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { Level } from '../../level/level.entity';
import { Target } from '../../target/target.entity';

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

  @Expose()
  @Type(type => Target)
  readonly targets: Target;
}
