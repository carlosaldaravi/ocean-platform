import { Repository, EntityRepository, getConnection } from 'typeorm';
import { User } from '../user.entity';
import { plainToClass } from 'class-transformer';
import { ReadUserDto } from '../dto';
import { RoleType } from '../../role/roletype.enum';
import { status } from '../../../shared/entity-status.enum';
import { ReadInstructorDto } from './dto/read-instructor.dto';
import { Sport } from '../../sport/sport.entity';
import { Level } from '../../level/level.entity';
import { UserCalendar } from '../../calendar/user-calendar.entity';
import { UserDetails } from '../user.details.entity';
import { Course } from '../../course/course.entity';
import { CourseInstructor } from '../../course/course-instructor.entity';
import { ReadTargetDto } from '../../target/dto';
import { Target } from '../../target/target.entity';
import { CourseCalendar } from 'src/modules/calendar/course-calendar.entity';
import { CourseStudent } from 'src/modules/course/course-student.entity';

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
      .leftJoinAndSelect('level.targets', 'targets')
      .leftJoinAndSelect('course.courseStudents', 'cs')
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
      .andWhere('targets.sport_id = sport.id')
      .setParameter('id', user.id)
      .getMany();

    return courses;

    // return targets.map(target => plainToClass(ReadTargetDto, target));
  }
}
