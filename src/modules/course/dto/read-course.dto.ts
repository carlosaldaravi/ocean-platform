import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadLevelDto } from 'src/modules/level/dto';
import { ReadSportDto } from 'src/modules/sport/dto';
import { ReadCourseTypeDto } from '../type/dto';

@Exclude()
export class ReadCourseDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @Type(type => ReadLevelDto)
  readonly level: ReadLevelDto;

  @Expose()
  @Type(type => ReadSportDto)
  readonly sport: ReadSportDto;

  @Expose()
  @Type(type => ReadCourseTypeDto)
  readonly type: ReadCourseTypeDto;
}
