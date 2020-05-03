import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from '../course/course.reposity';
import { CreateCourseDto, ReadCourseDto } from './dto';
import { plainToClass } from 'class-transformer';
import { Course } from './course.entity';
import { CourseCalendar } from '../calendar/course-calendar.entity';
import { CreateCourseCalendarDto } from '../calendar/dto';
import { Level } from '../level/level.entity';
import { CourseStudent } from './course-student.entity';
import { CourseInstructor } from './course-instructor.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private readonly _courseRepository: CourseRepository,
    @InjectRepository(CourseRepository)
    private readonly _calendarRepository: CourseRepository,
  ) {}
  async get(courseId: number): Promise<ReadCourseDto> {
    if (!courseId) {
      throw new BadRequestException('courseId must be sent');
    }
    const course: Course = await this._courseRepository.findOne(courseId);
    if (!course) {
      throw new HttpException('This course does not exists', HttpStatus.OK);
    }
    return plainToClass(ReadCourseDto, course);
  }

  async getAll(): Promise<ReadCourseDto[]> {
    const courses: Course[] = await this._courseRepository.find();

    if (!courses) {
      throw new NotFoundException();
    }

    return courses.map((course: Course) => plainToClass(ReadCourseDto, course));
  }
  async create(course: any, calendar: any): Promise<ReadCourseDto> {
    const savedCourse = await this._courseRepository
      .create({
        level: course.levelId,
        sport: course.sportId,
        type: course.typeId,
      })
      .save();
    calendar.courseId = savedCourse.id;
    await CourseCalendar.save(calendar);

    let courses = [];
    for (let i = 0; i < course.studentId.length; i++) {
      courses.push({
        courseId: savedCourse.id,
        studentId: course.studentId[i],
      });
    }

    await CourseStudent.createQueryBuilder()
      .insert()
      .into(CourseStudent)
      .values(courses)
      .execute();

    await CourseInstructor.createQueryBuilder()
      .insert()
      .into(CourseInstructor)
      .values({ courseId: savedCourse.id, instructorId: course.instructorId })
      .execute();

    return plainToClass(ReadCourseDto, savedCourse);
  }

  async studentPaid(
    courseId: number,
    studentId: number,
  ): Promise<ReadCourseDto> {
    const course = await CourseStudent.findOne({
      where: {
        courseId,
        studentId,
      },
    });
    course.paid = true;
    course.save();
    return plainToClass(Course, course);
  }

  async instructorCashed(
    courseId: number,
    instructorId: number,
  ): Promise<ReadCourseDto> {
    const course = await CourseInstructor.findOne({
      where: {
        courseId,
        instructorId,
      },
    });
    course.cashed = true;
    course.save();
    return plainToClass(Course, course);
  }
}
