import { IsEmail, IsString } from 'class-validator';
import { status } from '../../../shared/entity-status.enum';
import { Type } from 'class-transformer';
import { Language } from '../../language/language.entity';
import { UserSport } from '../user-sports.entity';
import { UserDetails } from '../user.details.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ReadUserDetailsDto } from './read-user-details.dto';
import { ReadLanguageDto } from 'src/modules/language/dto';
import { ReadUserSportDto } from './read-user-sport.dto';

export class UpdateUserDto {
  @IsEmail()
  @ApiProperty({ type: String, description: 'string' })
  readonly email: string;

  @IsString()
  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE'] })
  readonly status: status;

  @Type(type => ReadUserDetailsDto)
  @ApiProperty({ type: ReadUserDetailsDto, description: 'ReadUserDetailsDto' })
  details: ReadUserDetailsDto;

  @Type(type => ReadLanguageDto)
  @ApiProperty({ type: [ReadLanguageDto], description: 'ReadLanguageDto' })
  languages: ReadLanguageDto[];

  @Type(type => ReadUserSportDto)
  @ApiProperty({ type: [ReadUserSportDto], description: 'ReadUserSportDto' })
  userSports: ReadUserSportDto[];
}
