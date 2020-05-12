import {
  Repository,
  EntityRepository,
  In,
  LessThan,
  LessThanOrEqual,
} from 'typeorm';
import { User } from '../user.entity';
import { ReadStudentDto } from './dto/read-student.dto';
import { plainToClass } from 'class-transformer';
import { ReadUserDto } from '../dto';
import { RoleType } from 'src/modules/role/roletype.enum';
import { status } from 'src/shared/entity-status.enum';
import { ReadInstructorDto } from '../instructor/dto/read-instructor.dto';
import { CreateStudentDto } from './dto';
import { Sport } from 'src/modules/sport/sport.entity';
import { Target } from 'src/modules/target/target.entity';
import { Level } from 'src/modules/level/level.entity';
import { UserCalendar } from 'src/modules/calendar/user-calendar.entity';
import { UserDetails } from '../user.details.entity';
import { StudentTarget } from './student-target.entity';
import { Course } from 'src/modules/course/course.entity';
import { CourseStudent } from 'src/modules/course/course-student.entity';

@EntityRepository(User)
export class StudentRepository extends Repository<User> {
  async findUsersByRole(role: RoleType): Promise<any[]> {
    const users = await this.createQueryBuilder('u')
      .leftJoinAndSelect('u.details', 'd')
      .leftJoinAndSelect('u.roles', 'r')
      .where('r.name = :name', { name: role })
      .andWhere('u.status = :status', { status: status.ACTIVE })
      .getMany();

    switch (role) {
      case RoleType.STUDENT:
        return users.map((user: User) => plainToClass(ReadStudentDto, user));
      case RoleType.INSTRUCTOR:
        return users.map((user: User) => plainToClass(ReadInstructorDto, user));
      default:
        return users.map((user: User) => plainToClass(ReadUserDto, user));
    }
  }

  async getDataToStart() {
    const sports = await Sport.find({ where: { status: status.ACTIVE } });
    const levels = await Level.find({ where: { status: status.ACTIVE } });

    let data = {
      ok: true,
      message: 'Getting data to register as student',
      data: {
        sports,
        levels,
      },
    };
    return data;
  }

  async getTargets(user: User): Promise<any> {
    const targets = await Target.createQueryBuilder('target')
      .innerJoin('target.students', 'student')
      .where('student.id = :id', { id: user.id })
      .getMany();

    // TODO: it is posible to get this in one query?

    const studentTargets = await StudentTarget.find({
      where: { studentId: user.id },
    });

    const response = [];
    // adding who validated the target to the student
    targets.forEach(target => {
      studentTargets.forEach(st => {
        if (target.id === st.targetId) {
          response.push({ target, validatedBy: st.validatedBy });
        }
      });
    });

    return response;

    // return targets.map(target => plainToClass(ReadTargetDto, target));
  }

  async getCourses(user: User): Promise<any> {
    const courses = await Course.createQueryBuilder('course')
      .innerJoinAndSelect('course.instructors', 'instructor')
      .innerJoinAndSelect('instructor.details', 'instructorsDetails')
      .innerJoinAndSelect('course.sport', 'sport')
      .innerJoinAndSelect('course.level', 'level')
      .innerJoinAndSelect('course.type', 'type')
      .innerJoinAndSelect('course.students', 'student')
      .innerJoinAndSelect('student.details', 'studentsDetails')
      .innerJoinAndSelect('course.calendar', 'calendar')
      .where(qb => {
        const subQuery = qb
          .subQuery()
          .select('course_id')
          .from(CourseStudent, 'cs')
          .where('student_id = :id')
          .getQuery();
        return 'course.id IN' + subQuery;
      })
      .setParameter('id', user.id)
      .getMany();

    return courses;

    // return targets.map(target => plainToClass(ReadTargetDto, target));
  }

  async createStudent(
    createStudentDto: CreateStudentDto,
    user: User,
  ): Promise<void> {
    console.log('user: ', user);
    console.log('createStudentDto: ', createStudentDto);

    await this.createQueryBuilder()
      .update(UserDetails)
      .set(createStudentDto.details)
      .where('id = :id', { id: user.id })
      .execute();

    const foundUser: User = await User.findOne(user.id);
    const level = await Level.findOne(createStudentDto.level.id);
    const targets = await Target.createQueryBuilder('t')
      .innerJoin('t.level', 'l')
      .where('l.order <= :order', { order: level.order })
      .getMany();

    await UserCalendar.createQueryBuilder()
      .insert()
      .into('user_calendar')
      .values(createStudentDto.calendar)
      .execute();

    // foundUser.sports = createStudentDto.sports;
    // foundUser.level = createStudentDto.level;
    // foundUser.languages = createStudentDto.languages;
    // foundUser.targets = targets;

    User.save(foundUser);
  }
}
