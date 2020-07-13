import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarRepository } from './calendar.reposity';
import {
  ReadUserCalendarDto,
  CreateUserCalendarDto,
  UpdateUserCalendarDto,
} from './dto';
import { plainToClass } from 'class-transformer';
import { UserCalendar } from './user-calendar.entity';
import { In } from 'typeorm';
import { User } from '../user/user.entity';
import { status } from '../../shared/entity-status.enum';
import { CourseCalendar } from './course-calendar.entity';
import { CourseCalendarRepository } from './course-calendar.reposity';
import { Course } from '../course/course.entity';
import { ReadCourseCalendarDto } from './dto/read-course-calendar.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarRepository)
    private readonly _calendarRepository: CalendarRepository,
    private readonly _courseCalendarRepository: CourseCalendarRepository,
  ) {}

  async getAll(): Promise<ReadUserCalendarDto[]> {
    const calendars: UserCalendar[] = await this._calendarRepository
      .createQueryBuilder('calendar')
      .innerJoin('calendar.user', 'user')
      .where('user.status = :status', { status: status.ACTIVE })
      .getMany();

    if (!calendars) {
      throw new NotFoundException();
    }

    return calendars.map((calendar: UserCalendar) =>
      plainToClass(ReadUserCalendarDto, calendar),
    );
  }

  async getCoursesCalendar(): Promise<ReadCourseCalendarDto[]> {
    const calendars: CourseCalendar[] = await this._courseCalendarRepository
      .createQueryBuilder('course_calendar')
      .innerJoinAndSelect('course_calendar.course', 'course')
      .innerJoinAndSelect('course.level', 'level')
      .innerJoinAndSelect('course.sport', 'sport')
      .innerJoinAndSelect('course.type', 'type')
      .getMany();

    if (!calendars) {
      throw new NotFoundException();
    }

    return calendars.map((calendar: CourseCalendar) =>
      plainToClass(ReadCourseCalendarDto, calendar),
    );
  }

  async getCalendarByStudent(userId: number): Promise<ReadUserCalendarDto[]> {
    if (!userId) {
      throw new BadRequestException('Student id must be sent');
    }

    const calendars: UserCalendar[] = await this._calendarRepository.find({
      where: { users: In[userId] },
    });

    return calendars.map(calendar =>
      plainToClass(ReadUserCalendarDto, calendar),
    );
  }

  async create(
    calendar: Partial<CreateUserCalendarDto[]>,
    user: User,
  ): Promise<any> {
    await this._calendarRepository.save(calendar);
    return true;
  }

  async update(
    calendarId: number,
    calendar: Partial<UpdateUserCalendarDto>,
  ): Promise<ReadUserCalendarDto> {
    const updatedCalendar = await this._calendarRepository
      .createQueryBuilder()
      .update(UserCalendar)
      .set(calendar)
      .where('id = :id', { id: calendarId })
      .execute();

    return plainToClass(ReadUserCalendarDto, updatedCalendar);
  }

  async delete(calendarId: number): Promise<void> {
    await this._calendarRepository
      .createQueryBuilder()
      .delete()
      .from(UserCalendar)
      .where('id = :id', { id: calendarId })
      .execute();
  }
}
