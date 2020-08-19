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
import { AuthService } from 'src/modules/auth/auth.service';
import { ReadUserSportDto } from '../dto/read-user-sport.dto';
import { ReadStudentTargetDto } from './dto/read-student-target.dto';

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
    let courseCalendar = await CourseCalendar.createQueryBuilder(
      'courseCalendar',
    )
      .innerJoinAndSelect('courseCalendar.course', 'course')
      .innerJoinAndSelect('course.sport', 'sport')
      .innerJoinAndSelect('course.level', 'level')
      .where('courseCalendar.start >= :today')
      .andWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select('sport_id')
          .from(UserSport, 'us')
          .where('us.user_id = :userId')
          .andWhere('course.level_id = us.level_id')
          .getQuery();
        return 'course.sport_id IN' + subQuery;
      })
      .setParameters({ userId: user.id, today: new Date() })
      .getMany();

    let userCalendar = await UserCalendar.find({ where: { userId: user.id } });

    return [...courseCalendar, ...userCalendar];
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
      .leftJoinAndSelect('student.studentTargets', 'student_targets')
      .leftJoinAndSelect('student_targets.target', 'target')
      .leftJoinAndSelect('target.level', 'target_level')
      .where(qb => {
        const subQuery = qb
          .subQuery()
          .select('course_id')
          .from(CourseStudent, 'cs')
          .where('student_id = :id')
          .getQuery();
        return 'course.id IN' + subQuery;
      })
      .andWhere('target.sportId = sport.id')
      .andWhere('target.levelId = level.id')
      .orderBy('calendar.start', 'DESC')
      .setParameter('id', user.id)
      .getMany();

    return courses;

    // return targets.map(target => plainToClass(ReadTargetDto, target));
  }

  async createStudent(
    createStudentDto: any,
    user: User,
    authService,
  ): Promise<any> {
    const foundUser: User = await User.findOne(user.id);
    const userId = user.id;

    await this.createQueryBuilder()
      .update(UserDetails)
      .set(createStudentDto.details)
      .where('id = :id', { id: foundUser.details.id })
      .execute();

    const studentRole: Role = await Role.findOne({
      where: { name: 'ALUMNO' },
    });

    await this.createQueryBuilder()
      .relation(User, 'roles')
      .of(foundUser)
      .add(studentRole);

    let userSportsSelected: Partial<ReadUserSportDto>[] = [];
    let studentTargets: Partial<ReadStudentTargetDto>[] = [];

    const targets: Target[] = await Target.find();

    createStudentDto.userSports.forEach(async uSport => {
      let level = uSport.sportLevels.find(sl => sl.checked == true);
      if (level) {
        userSportsSelected.push({
          userId,
          sportId: uSport.id,
          levelId: level.sportLevel.levelId,
        });

        targets.forEach(target => {
          if (
            target.levelId == level.sportLevel.levelId &&
            target.sportId == uSport.id
          ) {
            studentTargets.push({ studentId: userId, targetId: target.id });
          }
        });
      }
    });

    await getManager().insert(UserSport, userSportsSelected);
    await getManager().insert(StudentTarget, studentTargets);

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

    const token = authService.reloadToken(newUser);

    return { token: token.token, user: newUser };
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
