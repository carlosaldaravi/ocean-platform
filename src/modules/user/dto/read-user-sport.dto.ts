import { IsNumber, IsEmail, IsString } from 'class-validator';
import { ReadUserDetailsDto } from './read-user-details.dto';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../role/dto';
import { status } from '../../../shared/entity-status.enum';
import { ReadSportDto } from 'src/modules/sport/dto';
import { ReadLevelDto } from 'src/modules/level/dto';

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
