import { Type } from 'class-transformer';
import { UserDetails } from '../../user.details.entity';
import { Language } from '../../../language/language.entity';
import { UserSport } from '../../user-sports.entity';
import { Sport } from 'src/modules/sport/sport.entity';
import { IsEmail } from 'class-validator';

export class CreateInstructorDto {
  @IsEmail()
  email: string;

  @Type(type => UserDetails)
  details: UserDetails;

  @Type(type => UserSport)
  userSports: UserSport[];

  @Type(type => Sport)
  sports: Sport[];

  @Type(type => Language)
  languages: Language[];
}
