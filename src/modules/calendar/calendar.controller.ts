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
import {
  ReadUserCalendarDto,
  CreateUserCalendarDto,
  UpdateUserCalendarDto,
} from './dto';
import { CalendarService } from './calendar.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { Roles } from '../role/decorators/role.decoratos';
import { RoleType } from '../role/roletype.enum';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/user.decorator';

@Controller('calendar')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class CalendarController {
  constructor(private readonly _calendarService: CalendarService) {}

  @Get(':calendarId')
  getCalendar(
    @Param('calendarId', ParseIntPipe) calendarId: number,
  ): Promise<ReadUserCalendarDto> {
    return this._calendarService.get(calendarId);
  }

  @Get()
  async getCalendars(): Promise<ReadUserCalendarDto[]> {
    return this._calendarService.getAll();
  }

  @Post()
  createCalendar(
    @Body() calendar: Partial<CreateUserCalendarDto[]>,
    @GetUser() user: User,
  ): Promise<ReadUserCalendarDto[]> {
    return this._calendarService.create(calendar, user);
  }

  @Patch(':calendarId')
  updateCalendar(
    @Param('calendarId', ParseIntPipe) calendarId: number,
    @Body() calendar: Partial<UpdateUserCalendarDto>,
  ): Promise<ReadUserCalendarDto> {
    return this._calendarService.update(calendarId, calendar);
  }

  @Delete(':calendarId')
  deleteCalendar(@Param('calendarId', ParseIntPipe) calendarId: number) {
    return this._calendarService.delete(calendarId);
  }
}
