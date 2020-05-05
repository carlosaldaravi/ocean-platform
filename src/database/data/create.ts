import { Logger } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { User } from '../../modules/user/user.entity';
import { Role } from '../../modules/role/role.entity';
import { Language } from '../../modules/language/language.entity';
import { Sport } from '../../modules/sport/sport.entity';
import { Target } from '../../modules/target/target.entity';
import { CalendarType } from '../../modules/calendar/calendar-type.entity';
import { UserDetails } from '../../modules/user/user.details.entity';
import { calendarTypes_DB_DATA } from './calendarTypes';
import { users_DB_DATA } from './users';
import { roles_DB_DATA } from './roles';
import { sports_DB_DATA } from './sports';
import { targets_DB_DATA } from './targets';
import { languages_DB_DATA } from './languages';
import { Level } from '../../modules/level/level.entity';
import { levels_DB_DATA } from './levels';
import { userDetails_DB_DATA } from './user-details';
import { userCalendar_DB_DATA } from './user-calendar';
import { CourseType } from 'src/modules/course/course-type.entity';
import { courseType_DB_DATA } from './course-type';
import { Course } from 'src/modules/course/course.entity';
import { course_DB_DATA } from './course';
import { courseCalendar_DB_DATA } from './course-calendar';
import { studentTargets_DB_DATA } from './student-targets';
import { StudentTarget } from 'src/modules/user/student/student-target.entity';
import { CourseStudent } from 'src/modules/course/course-student.entity';
import { CourseInstructor } from 'src/modules/course/course-instructor.entity';
import { courseStudents_DB_DATA } from './course-students';
import { courseInstructors_DB_DATA } from './course-instructors';
import { RoleType } from 'src/modules/role/roletype.enum';

// insert data base examples

export const setDefaultValues = async () => {
  const logger = new Logger('SetDefaultValues');

  try {
    if ((await CalendarType.count()) == 0) {
      logger.log(`Adding calendar types...`);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('calendar_types')
        .values(calendarTypes_DB_DATA)
        .execute();
    }
    if ((await Level.count()) == 0) {
      logger.log(`Adding levels...`);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('levels')
        .values(levels_DB_DATA)
        .execute();
    }
    if ((await Language.count()) == 0) {
      logger.log(`Adding languages...`);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('languages')
        .values(languages_DB_DATA)
        .execute();
    }
    if ((await Sport.count()) == 0) {
      logger.log(`Adding sports...`);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('sports')
        .values(sports_DB_DATA)
        .execute();
    }
    if ((await Sport.count()) > 0 && (await Target.count()) == 0) {
      logger.log(`Adding targets...`);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('targets')
        .values(targets_DB_DATA)
        .execute();
    }

    if ((await Role.count()) == 0) {
      logger.log(`Adding roles...`);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('roles')
        .values(roles_DB_DATA)
        .execute();
    }
    if ((await UserDetails.count()) == 0) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('user_details')
        .values(userDetails_DB_DATA)
        .execute();
    }

    if ((await User.count()) == 0) {
      logger.log(`Adding users...`);
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('users')
        .values(users_DB_DATA)
        .execute();
      logger.log(`Adding calendar to users...`);
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('user_calendar')
        .values(userCalendar_DB_DATA)
        .execute();
      if ((await StudentTarget.count()) == 0) {
        logger.log(`Adding targets to students...`);

        await getConnection()
          .createQueryBuilder()
          .insert()
          .into('student_targets')
          .values(studentTargets_DB_DATA)
          .execute();
      }
      const spanish = await Language.findOne({ where: { name: 'Spanish' } });
      const roleGeneral = await Role.findOne({
        where: { name: RoleType.GENERAL },
      });
      const roleStudent = await Role.findOne({
        where: { name: RoleType.STUDENT },
      });
      const roleInstructor = await Role.findOne({
        where: { name: RoleType.INSTRUCTOR },
      });
      const kitesurf = await Sport.findOne({ where: { name: 'KiteSurf' } });
      const admin = await User.findOne(1);
      const student1 = await User.findOne(2);
      const student2 = await User.findOne(3);
      const student3 = await User.findOne(4);
      const instructor1 = await User.findOne(5);
      const instructor2 = await User.findOne(6);
      const instructor3 = await User.findOne(7);
      logger.log(`Adding languages to users...`);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(admin)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student1)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student2)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student3)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(instructor1)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(instructor2)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(instructor3)
        .add([spanish]);
      logger.log(`Adding roles to users...`);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(admin)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student1)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student2)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student3)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(instructor1)
        .add([roleGeneral, roleInstructor]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(instructor2)
        .add([roleGeneral, roleInstructor]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(instructor3)
        .add([roleGeneral, roleInstructor]);
      logger.log(`Adding sports to users...`);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student1)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student2)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student3)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(instructor1)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(instructor2)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(instructor3)
        .add([kitesurf]);
    }
    if ((await CourseType.count()) == 0) {
      logger.log(`Adding types of course...`);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('course_type')
        .values(courseType_DB_DATA)
        .execute();
    }
    if ((await Course.count()) == 0) {
      logger.log(`Adding courses...`);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('courses')
        .values(course_DB_DATA)
        .execute();
      logger.log(`Adding calendar to courses...`);
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('course_calendar')
        .values(courseCalendar_DB_DATA)
        .execute();
      if ((await CourseStudent.count()) == 0) {
        logger.log(`Adding students to courses...`);
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into('course_students')
          .values(courseStudents_DB_DATA)
          .execute();
      }
      if ((await CourseInstructor.count()) == 0) {
        logger.log(`Adding instructors to courses...`);
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into('course_instructors')
          .values(courseInstructors_DB_DATA)
          .execute();
      }
    }
  } catch (error) {
    console.log('Error setting default values', error);
  }
};
