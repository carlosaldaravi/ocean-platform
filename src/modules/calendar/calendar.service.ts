import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarRepository } from './calendar.reposity';
import {
  ReadUserCalendarDto,
  CreateUserCalendarDto,
  UpdateUserCalendarDto,
} from './dto';
import { plainToClass } from 'class-transformer';
import { Calendar } from './calendar.entity';
import { In } from 'typeorm';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarRepository)
    private readonly _calendarRepository: CalendarRepository,
  ) {}

  async get(calendarId: number): Promise<ReadUserCalendarDto> {
    if (!calendarId) {
      throw new BadRequestException('calendarId must be sent');
    }
    const calendar: Calendar = await this._calendarRepository.findOne(
      calendarId,
    );
    if (!calendar) {
      throw new NotFoundException('Calendar does not exist');
    }
    return plainToClass(ReadUserCalendarDto, calendar);
  }

  async getAll(): Promise<ReadUserCalendarDto[]> {
    const calendars: Calendar[] = await this._calendarRepository.find();

    if (!calendars) {
      throw new NotFoundException();
    }

    return calendars.map((calendar: Calendar) =>
      plainToClass(ReadUserCalendarDto, calendar),
    );
  }

  async getCalendarByStudent(userId: number): Promise<ReadUserCalendarDto[]> {
    if (!userId) {
      throw new BadRequestException('Student id must be sent');
    }

    const calendars: Calendar[] = await this._calendarRepository.find({
      where: { users: In[userId] },
    });

    return calendars.map(calendar =>
      plainToClass(ReadUserCalendarDto, calendar),
    );
  }

  async create(
    calendar: Partial<CreateUserCalendarDto>,
  ): Promise<ReadUserCalendarDto> {
    const savedCalendar: Calendar = await this._calendarRepository.save({
      date: calendar.date,
      start_time: calendar.start_time,
      end_time: calendar.end_time,
      comments: calendar.comments,
    });
    return plainToClass(ReadUserCalendarDto, savedCalendar);
  }

  async update(
    calendarId: number,
    calendar: Partial<UpdateUserCalendarDto>,
  ): Promise<ReadUserCalendarDto> {
    const foundCalendar = await this._calendarRepository.findOne(calendarId);

    if (!foundCalendar) {
      throw new NotFoundException('Calendar does not exists');
    }

    foundCalendar.date = calendar.date;
    foundCalendar.start_time = calendar.start_time;
    foundCalendar.end_time = calendar.end_time;
    foundCalendar.comments = calendar.comments;

    const updatedCalendar = await this._calendarRepository.findOne(
      foundCalendar,
    );

    return plainToClass(ReadUserCalendarDto, updatedCalendar);
  }

  async delete(calendarId: number): Promise<void> {
    const dateExist = await this._calendarRepository.findOne(calendarId);

    if (!dateExist) {
      throw new NotFoundException();
    }

    await this._calendarRepository.delete(calendarId);
  }
}
