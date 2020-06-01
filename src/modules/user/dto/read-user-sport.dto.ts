import { IsNumber } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadSportDto } from '../../sport/dto';
import { ReadLevelDto } from '../../level/dto';

@Exclude()
export class ReadUserSportDto {
  @Expose()
  @IsNumber()
  readonly userId: number;

  @Expose()
  @IsNumber()
  readonly sportId: number;

  @Expose()
  @IsNumber()
  readonly levelId: number;

  @Expose()
  @Type(type => ReadLevelDto)
  readonly level: ReadLevelDto;

  @Expose()
  @Type(type => ReadSportDto)
  readonly sport: ReadSportDto;
}
