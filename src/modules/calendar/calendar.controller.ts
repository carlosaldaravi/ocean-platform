import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReadCalendarDto, CreateCalendarDto, UpdateCalendarDto } from './dto';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly _calendarService: CalendarService) {}

  @Get(':calendarId')
  getCalendar(
    @Param('calendarId', ParseIntPipe) calendarId: number,
  ): Promise<ReadCalendarDto> {
    return this._calendarService.get(calendarId);
  }

  @Get()
  async getCalendars(): Promise<ReadCalendarDto[]> {
    return this._calendarService.getAll();
  }

  @Post()
  createCalendar(
    @Body() calendar: Partial<CreateCalendarDto>,
  ): Promise<ReadCalendarDto> {
    return this._calendarService.create(calendar);
  }

  @Patch(':calendarId')
  updateCalendar(
    @Param('calendarId', ParseIntPipe) calendarId: number,
    @Body() calendar: Partial<UpdateCalendarDto>,
  ): Promise<ReadCalendarDto> {
    return this._calendarService.update(calendarId, calendar);
  }

  @Delete(':calendarId')
  deleteCalendar(@Param('calendarId', ParseIntPipe) calendarId: number) {
    return this._calendarService.delete(calendarId);
  }
}
