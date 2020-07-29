import { Type } from 'class-transformer';
import { Language } from '../../../language/language.entity';
import { Sport } from 'src/modules/sport/sport.entity';
import { ReadUserDetailsDto } from '../../dto';
import { ApiProperty } from '@nestjs/swagger';
import { ReadUserSportDto } from '../../dto/read-user-sport.dto';
import { ReadSportDto } from 'src/modules/sport/dto';
import { ReadLanguageDto } from 'src/modules/language/dto';

export class CreateStudentDto {
  @Type(type => ReadUserDetailsDto)
  @ApiProperty({ type: ReadUserDetailsDto, description: 'ReadUserDetailsDto' })
  details: ReadUserDetailsDto;

  @Type(type => ReadUserSportDto)
  @ApiProperty({ type: [ReadUserSportDto], description: 'ReadUserSportDto' })
  userSports: ReadUserSportDto[];

  @Type(type => ReadSportDto)
  @ApiProperty({ type: [ReadSportDto], description: 'ReadSportDto' })
  sports: ReadSportDto[];

  @Type(type => ReadLanguageDto)
  @ApiProperty({ type: [ReadLanguageDto], description: 'ReadLanguageDto' })
  languages: ReadLanguageDto[];
}
