import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadSportLevelDto } from './read-sport-level.dto';
import { Target } from '../../target/target.entity';

@Exclude()
export class ReadSportDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly description: string;

  @Expose()
  @Type(type => ReadSportLevelDto)
  readonly sportLevel: ReadSportLevelDto[];

  @Expose()
  @Type(type => Target)
  readonly target: Target;
}
