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
import { User } from '../user/user.entity';
import { GetUser } from '../auth/user.decorator';
import { ReadCourseCalendarDto } from './dto/read-course-calendar.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('calendar')
@ApiTags('Calendar')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class CalendarController {
  constructor(private readonly _calendarService: CalendarService) {}

  @Get('course/:courseId')
  getCourseCalendar(
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<ReadCourseCalendarDto> {
    return this._calendarService.getCourseCalendar(courseId);
  }

  @Get()
  getCalendars(): Promise<ReadUserCalendarDto[]> {
    return this._calendarService.getAll();
  }

  @Get('courses')
  getCoursesCalendar(): Promise<ReadCourseCalendarDto[]> {
    return this._calendarService.getCoursesCalendar();
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

  @Delete('/course/:courseCalendarId')
  deleteCourseCalendar(
    @Param('courseCalendarId', ParseIntPipe) courseCalendarId: number,
  ) {
    return this._calendarService.deleteCourseCalendar(courseCalendarId);
  }

  @Delete(':calendarId')
  deleteCalendar(@Param('calendarId', ParseIntPipe) calendarId: number) {
    return this._calendarService.delete(calendarId);
  }
}
