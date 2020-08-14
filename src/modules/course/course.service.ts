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
import { Sport } from '../sport/sport.entity';
import { CourseType } from './course-type.entity';
import { User } from '../user/user.entity';
import { status } from '../../shared/entity-status.enum';

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
  async create(course: any): Promise<ReadCourseDto> {
    const savedCourse = await this._courseRepository
      .create({
        level: course.level.id,
        sport: course.sport.id,
        type: course.type.id,
      })
      .save();
    course.calendar.courseId = savedCourse.id;

    let cI = await CourseInstructor.createQueryBuilder()
      .insert()
      .into('course_instructors')
      .values({
        courseId: savedCourse.id,
        instructorId: course.instructor.id,
      })
      .returning('*')
      .execute();

    let cC = await CourseCalendar.createQueryBuilder()
      .insert()
      .into('course_calendar')
      .values(course.calendar)
      .returning('*')
      .execute();

    // await CourseInstructor.createQueryBuilder()
    //   .insert()
    //   .into(CourseInstructor)
    //   .values({ courseId: savedCourse.id, instructorId: course.instructorId })
    //   .execute();

    return cC.raw[0];
    return plainToClass(ReadCourseDto, savedCourse);
  }

  async getNewCourse() {
    const sports = await Sport.createQueryBuilder('sport')
      .innerJoinAndSelect('sport.sportLevels', 'sportLevels')
      .innerJoinAndSelect('sportLevels.level', 'level')
      .getMany();

    const courseTypes = await CourseType.find();

    const instructors = await User.createQueryBuilder('u')
      .leftJoinAndSelect('u.details', 'd')
      .leftJoinAndSelect('u.roles', 'r')
      .leftJoinAndSelect('u.userSports', 'us')
      .leftJoinAndSelect('us.sport', 's')
      .where('r.name = :name', { name: 'INSTRUCTOR' })
      .andWhere('u.status = :status', { status: status.ACTIVE })
      .getMany();

    return {
      sports,
      courseTypes,
      instructors,
    };
  }

  async addStudent(
    courseId: number,
    studentId: number,
  ): Promise<ReadCourseDto> {
    const course = await CourseStudent.create({
      courseId,
      studentId,
    }).save();
    return plainToClass(ReadCourseDto, course);
  }

  async delStudent(courseId: number, studentId: number): Promise<void> {
    const course = await CourseStudent.delete({
      courseId,
      studentId,
    });
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
    return plainToClass(ReadCourseDto, course);
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
    return plainToClass(ReadCourseDto, course);
  }
}
