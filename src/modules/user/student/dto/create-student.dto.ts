import { Type } from 'class-transformer';
import { UserCalendar } from '../../../calendar/user-calendar.entity';
import { UserDetails } from '../../user.details.entity';
import { Language } from '../../../language/language.entity';
import { UserSport } from '../../user-sports.entity';

export class CreateStudentDto {
  @Type(type => UserDetails)
  details: UserDetails;

  @Type(type => UserSport)
  userSports: UserSport[];

  @Type(type => Language)
  languages: Language[];

  @Type(type => UserCalendar)
  calendar: UserCalendar[];
}
