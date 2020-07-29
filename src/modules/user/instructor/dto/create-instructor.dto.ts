import { Type } from 'class-transformer';
import { UserDetails } from '../../user.details.entity';
import { Language } from '../../../language/language.entity';
import { UserSport } from '../../user-sports.entity';
import { Sport } from 'src/modules/sport/sport.entity';
import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReadSportDto } from 'src/modules/sport/dto';
import { ReadLanguageDto } from 'src/modules/language/dto';
import { ReadUserSportDto } from '../../dto/read-user-sport.dto';
import { ReadInstructorDetailsDto } from './read-instructor-detail.dto';

export class CreateInstructorDto {
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @Type(type => ReadInstructorDetailsDto)
  @ApiProperty({
    type: ReadInstructorDetailsDto,
    description: 'ReadInstructorDetailsDto',
  })
  details: ReadInstructorDetailsDto;

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
