import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { RoleGuard } from '../role/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleType } from '../role/roletype.enum';
import { Roles } from '../role/decorators/role.decoratos';
import { ReadCourseDto, CreateCourseDto } from './dto';
import { CreateCourseCalendarDto } from '../calendar/dto';

@Controller('courses')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class CourseController {
  constructor(private _courseService: CourseService) {}

  @Get(':courseId')
  getCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<ReadCourseDto> {
    return this._courseService.get(courseId);
  }

  @Get()
  async getCourses(): Promise<ReadCourseDto[]> {
    return this._courseService.getAll();
  }

  @Post()
  @Roles(RoleType.ADMIN)
  createCourse(@Body() body: any): Promise<ReadCourseDto> {
    const course: Partial<CreateCourseDto> = body.course;
    const calendar: Partial<CreateCourseCalendarDto> = body.calendar;
    return this._courseService.create(course, calendar);
  }

  @Patch('paid/:courseId/:studentId')
  studentPaid(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ): Promise<ReadCourseDto> {
    return this._courseService.studentPaid(courseId, studentId);
  }

  @Patch('cashed/:courseId/:instructorId')
  instructorCashed(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('instructorId', ParseIntPipe) instructorId: number,
  ): Promise<ReadCourseDto> {
    return this._courseService.instructorCashed(courseId, instructorId);
  }
}
