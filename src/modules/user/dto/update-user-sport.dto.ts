import { IsNumber } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadSportDto } from 'src/modules/sport/dto';
import { ReadLevelDto } from 'src/modules/level/dto';

@Exclude()
export class UpdateUserSportDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  sportId: number;

  @IsNumber()
  levelId: number;

  @Type(type => ReadLevelDto)
  level: ReadLevelDto;

  @Type(type => ReadSportDto)
  sport: ReadSportDto;
}
