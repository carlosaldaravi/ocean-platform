import {
  Repository,
  EntityRepository,
  getConnection,
  getManager,
} from 'typeorm';
import { User } from '../user.entity';
import { Course } from '../../course/course.entity';
import { CourseInstructor } from '../../course/course-instructor.entity';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UserDetails } from '../user.details.entity';
import { UserSport } from '../user-sports.entity';
import { Role } from 'src/modules/role/role.entity';

@EntityRepository(User)
export class InstructorRepository extends Repository<User> {
  // async getTargets(user: User): Promise<ReadTargetDto[]> {
  //   const targets = await Target.createQueryBuilder('target')
  //     .innerJoinAndSelect('target.sport', 'sport')
  //     .innerJoinAndSelect('target.level', 'level')
  //     .leftJoinAndSelect('target.instructorTargets', 'sT', 'sT.instructorId = :id')
  //     .leftJoinAndSelect('sT.instructor', 'instructor')
  //     .leftJoinAndSelect('instructor.details', 'iD')
  //     .innerJoin('sport.userSport', 'uS')
  //     .where('uS.user = :id')
  //     .orderBy('target.id', 'ASC')
  //     .setParameter('id', user.id)
  //     .getMany();

  //   return targets.map((sport: Target) => plainToClass(ReadTargetDto, sport));
  // }

  async getCourses(user: User): Promise<any> {
    const courses = await Course.createQueryBuilder('course')
      .innerJoinAndSelect('course.courseInstructors', 'ci')
      .innerJoinAndSelect('ci.instructor', 'instructor')
      .innerJoinAndSelect('instructor.details', 'instructorsDetails')
      .innerJoinAndSelect('course.sport', 'sport')
      .innerJoinAndSelect('course.level', 'level')
      .innerJoinAndSelect('course.type', 'type')
      .leftJoinAndSelect('course.courseStudents', 'cs')
      .leftJoinAndSelect('level.targets', 'targets')
      .leftJoinAndSelect('cs.student', 'student')
      .leftJoinAndSelect('student.details', 'studentsDetails')
      .leftJoinAndSelect('student.studentTargets', 'student_targets')
      .leftJoinAndSelect('student_targets.target', 'target')
      .leftJoinAndSelect('target.level', 'target_level')
      .innerJoinAndSelect('course.calendar', 'calendar')
      .where(qb => {
        const subQuery = qb
          .subQuery()
          .select('course_id')
          .from(CourseInstructor, 'cs')
          .where('instructor_id = :id')
          .getQuery();
        return 'course.id IN' + subQuery;
      })
      .andWhere('target.sportId = sport.id')
      .andWhere('target.levelId = level.id')
      .andWhere('targets.sportId = sport.id')
      .orderBy('calendar.start', 'DESC')
      .setParameter('id', user.id)
      .getMany();

    return courses;

    // return targets.map(target => plainToClass(ReadTargetDto, target));
  }

  async createInstructor(createInstructorDto: any): Promise<void> {
    console.log('createInstructorDto: ', createInstructorDto);

    const foundUser: User = await User.findOne({
      where: { email: createInstructorDto.email },
    });

    const instructorRole: Role = await Role.findOne({
      where: { name: 'INSTRUCTOR' },
    });

    await this.createQueryBuilder()
      .relation(User, 'roles')
      .of(foundUser)
      .add(instructorRole);

    await this.createQueryBuilder()
      .update(UserDetails)
      .set(createInstructorDto.details)
      .where('id = :id', { id: foundUser.id })
      .execute();

    let languages = [];
    createInstructorDto.languages.forEach(language => {
      if (language.checked) {
        languages.push({ id: language.id, name: language.name });
      }
    });

    createInstructorDto.sports.forEach(async sport => {
      if (sport.checked) {
        await getManager().transaction(async manager => {
          const userSport = new UserSport();
          userSport.userId = foundUser.id;
          userSport.sportId = sport.id;
          userSport.levelId = 1;
          manager.save(userSport);
        });
      }
    });

    await getConnection()
      .createQueryBuilder()
      .relation(User, 'languages')
      .of(foundUser)
      .add(languages);
  }
}
