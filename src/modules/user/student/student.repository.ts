import { Repository, EntityRepository, getConnection } from 'typeorm';
import { User } from '../user.entity';
import { ReadStudentDto } from './dto/read-student.dto';
import { plainToClass } from 'class-transformer';
import { ReadUserDto } from '../dto';
import { RoleType } from '../../role/roletype.enum';
import { status } from '../../../shared/entity-status.enum';
import { ReadInstructorDto } from '../instructor/dto/read-instructor.dto';
import { CreateStudentDto } from './dto';
import { Sport } from '../../sport/sport.entity';
import { Level } from '../../level/level.entity';
import { UserCalendar } from '../../calendar/user-calendar.entity';
import { UserDetails } from '../user.details.entity';
import { Course } from '../../course/course.entity';
import { CourseStudent } from '../../course/course-student.entity';
import { CreateStudentCalendarDto } from './dto/create-student-calendar.dto';
import { ReadTargetDto } from '../../target/dto';
import { Target } from '../../target/target.entity';
import { CourseCalendar } from 'src/modules/calendar/course-calendar.entity';

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

  async getTargets(user: User): Promise<ReadTargetDto[]> {
    const targets = await Target.createQueryBuilder('target')
      .innerJoinAndSelect('target.sport', 'sport')
      .innerJoinAndSelect('target.level', 'level')
      .leftJoinAndSelect('target.studentTargets', 'sT', 'sT.studentId = :id')
      .leftJoinAndSelect('sT.instructor', 'instructor')
      .leftJoinAndSelect('instructor.details', 'iD')
      .innerJoin('sport.userSport', 'uS')
      .where('uS.user = :id')
      .orderBy('target.id', 'ASC')
      .setParameter('id', user.id)
      .getMany();

    return targets.map((sport: Target) => plainToClass(ReadTargetDto, sport));
  }

  async getCalendar(user: User): Promise<any> {
    let foundUser = await User.createQueryBuilder('user')
      .innerJoinAndSelect('user.userSports', 'userSports')
      .where('user.id = :id', { id: user.id })
      .getOne();
    let userSportsIds = foundUser.userSports.map(sport => sport.sportId);
    console.log('user: ', foundUser);
    console.log('userSportsIds: ', userSportsIds);
    let courseCalendar = await CourseCalendar.createQueryBuilder(
      'courseCalendar',
    )
      .innerJoinAndSelect('courseCalendar.course', 'course')
      .innerJoinAndSelect('course.sport', 'sport')
      .innerJoinAndSelect('course.level', 'level')
      .where('course.sport_id IN (:...ids)', { ids: userSportsIds })
      .getMany();

    console.log(courseCalendar);

    let userCalendar = await UserCalendar.find({ where: { userId: user.id } });

    return [...courseCalendar, ...userCalendar];

    // return targets.map(target => plainToClass(ReadTargetDto, target));
  }

  async getCourses(user: User): Promise<any> {
    const courses = await Course.createQueryBuilder('course')
      .innerJoinAndSelect('course.courseInstructors', 'ci')
      .innerJoinAndSelect('ci.instructor', 'instructor')
      .innerJoinAndSelect('instructor.details', 'instructorsDetails')
      .innerJoinAndSelect('course.sport', 'sport')
      .innerJoinAndSelect('course.level', 'level')
      .innerJoinAndSelect('course.type', 'type')
      .innerJoinAndSelect('course.courseStudents', 'cs')
      .innerJoinAndSelect('cs.student', 'student')
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
    // const targets = await Target.createQueryBuilder('t')
    //   .innerJoin('t.level', 'l')
    //   .where('l.order <= :order', { order: level.order })
    //   .getMany();

    //   await getManager().transaction(async manager => {
    //     const userSports = new UserSport();
    //     userSports.userId = user.id;
    //     userSports.sportId = createStudentDto.userSports.sportId;
    //     userSports.levelId = createStudentDto.userSports.levelId;

    //     manager.save(userSports);
    // });

    await getConnection()
      .createQueryBuilder()
      .relation(User, 'userSports')
      .of(foundUser)
      .add(createStudentDto.userSports);

    // foundUser.sports = createStudentDto.sports;
    // foundUser.level = createStudentDto.level;
    // foundUser.languages = createStudentDto.languages;
    // foundUser.targets = targets;

    await User.save(foundUser);
  }

  async createStudentCalendar(
    createStudentCalendarDto: CreateStudentCalendarDto,
    user: User,
  ): Promise<any> {
    createStudentCalendarDto.userId = user.id;
    createStudentCalendarDto.typeId = 2;

    let uC = await UserCalendar.createQueryBuilder()
      .insert()
      .into('user_calendar')
      .values(createStudentCalendarDto)
      .returning('*')
      .execute();
    console.log(uC.raw);

    return uC.raw[0];
    // return plainToClass(ReadStudentCalendarDto, uC);
  }
}
