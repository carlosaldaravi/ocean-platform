import { Repository, EntityRepository } from 'typeorm';
import { UserCalendar } from './user-calendar.entity';

@EntityRepository(UserCalendar)
export class CalendarRepository extends Repository<UserCalendar> {}
