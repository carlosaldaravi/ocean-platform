import { Repository, EntityRepository } from 'typeorm';
import { CourseCalendar } from './course-calendar.entity';

@EntityRepository(CourseCalendar)
export class CourseCalendarRepository extends Repository<CourseCalendar> {}
