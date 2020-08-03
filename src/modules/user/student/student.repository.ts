import {
  Repository,
  EntityRepository,
  getConnection,
  getManager,
} from 'typeorm';
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
import { Language } from 'src/modules/language/language.entity';
import { UserSport } from '../user-sports.entity';
import { Role } from 'src/modules/role/role.entity';
import { StudentTarget } from './student-target.entity';

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
    const sports = await Sport.createQueryBuilder('sport')
      .leftJoinAndSelect('sport.sportLevels', 'sportLevels')
      .leftJoinAndSelect('sportLevels.level', 'level')
      .leftJoinAndSelect('sport.targets', 'targets')
      .orderBy({
        'sport.id': 'ASC',
        'level.id': 'ASC',
        'targets.id': 'ASC',
      })
      .getMany();
    const levels = await Level.find();
    const languages = await Language.find();

    let data = {
      ok: true,
      message: 'Getting data to register as student',
      data: {
        sports,
        levels,
        languages,
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

    let courseCalendar = await CourseCalendar.createQueryBuilder(
      'courseCalendar',
    )
      .innerJoinAndSelect('courseCalendar.course', 'course')
      .innerJoinAndSelect('course.sport', 'sport')
      .innerJoinAndSelect('course.level', 'level')
      .where('course.sport_id IN (:...ids)', { ids: userSportsIds })
      .getMany();

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

  async createStudent(createStudentDto: any, user: User): Promise<any> {
    const foundUser: User = await User.findOne(user.id);

    await this.createQueryBuilder()
      .update(UserDetails)
      .set(createStudentDto.details)
      .where('id = :id', { id: foundUser.details.id })
      .execute();

    const studentRole: Role = await Role.findOne({
      where: { name: 'STUDENT' },
    });

    await this.createQueryBuilder()
      .relation(User, 'roles')
      .of(foundUser)
      .add(studentRole);

    createStudentDto.userSports.forEach(async uSport => {
      await getManager().transaction(async manager => {
        const userSports = new UserSport();
        userSports.userId = user.id;
        userSports.sportId = uSport.id;
        let level = uSport.sportLevels.find(sl => sl.checked == true);
        userSports.levelId = level.sportLevel.levelId;

        const targets: Target[] = await Target.find({
          where: { levelId: userSports.levelId, sportId: userSports.sportId },
        });

        targets.forEach(async target => {
          await getManager().transaction(async manager => {
            const studentTarget = new StudentTarget();
            studentTarget.studentId = user.id;
            studentTarget.targetId = target.id;
            manager.save(studentTarget);
          });
        });

        manager.save(userSports);
      });
    });

    await getConnection()
      .createQueryBuilder()
      .relation(User, 'languages')
      .of(foundUser)
      .add(createStudentDto.languages);

    const newUser: User = await User.createQueryBuilder('user')
      .innerJoinAndSelect('user.details', 'details')
      .innerJoinAndSelect('user.roles', 'roles')
      .where('user.id = :id')
      .setParameter('id', user.id)
      .getOne();

    return {
      user: newUser,
    };

    // debería devolver esto

    // const payload: IJwtPayload = {
    //   id: user.id,
    //   email: user.email,
    //   roles: user.roles.map(r => r.name as RoleType),
    // };

    // const token = this._jwtService.sign(payload);

    // return plainToClass(LoggedInDto, { token, user });
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

    return uC.raw[0];
    // return plainToClass(ReadStudentCalendarDto, uC);
  }
}
