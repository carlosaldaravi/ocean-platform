import { Type } from 'class-transformer';
import { Sport } from 'src/modules/sport/sport.entity';
import { Level } from 'src/modules/level/level.entity';
import { UserCalendar } from 'src/modules/calendar/user-calendar.entity';
import { UserDetails } from '../../user.details.entity';

export class CreateStudentDto {
  @Type(type => UserDetails)
  details: UserDetails;

  @Type(type => Sport)
  sports: Sport[];

  @Type(type => Level)
  level: Level;

  @Type(type => UserCalendar)
  calendar: UserCalendar[];
}
