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
      // logger.log(`Adding calendar to users...`);
      // await getConnection()
      //   .createQueryBuilder()
      //   .insert()
      //   .into('user_calendar')
      //   .values(userCalendar_DB_DATA)
      //   .execute();
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
      const english = await Language.findOne({ where: { name: 'English' } });
      const roleGeneral = await Role.findOne({
        where: { name: RoleType.GENERAL },
      });
      const roleAdmin = await Role.findOne({
        where: { name: RoleType.ADMIN },
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
      const student4 = await User.findOne(5);
      const student5 = await User.findOne(6);
      const student6 = await User.findOne(7);
      const student7 = await User.findOne(8);
      const student8 = await User.findOne(9);
      const student9 = await User.findOne(10);
      const student10 = await User.findOne(11);
      const student11 = await User.findOne(12);
      const student12 = await User.findOne(13);
      const student13 = await User.findOne(14);
      const student14 = await User.findOne(15);
      const student15 = await User.findOne(16);
      const student16 = await User.findOne(17);
      const student17 = await User.findOne(18);
      const student18 = await User.findOne(19);
      const student19 = await User.findOne(20);
      const student20 = await User.findOne(21);
      const student21 = await User.findOne(22);
      const student22 = await User.findOne(23);
      const student23 = await User.findOne(24);
      const student24 = await User.findOne(25);
      const student25 = await User.findOne(26);
      const student26 = await User.findOne(27);
      const student27 = await User.findOne(28);
      const student28 = await User.findOne(29);
      const student29 = await User.findOne(30);
      const student30 = await User.findOne(31);
      const instructor1 = await User.findOne(32);
      const instructor2 = await User.findOne(33);
      const instructor3 = await User.findOne(34);
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
        .of(student4)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student5)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student6)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student7)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student8)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student9)
        .add([english]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student10)
        .add([english]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student11)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student12)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student13)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student14)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student15)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student16)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student17)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student18)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student19)
        .add([english]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student20)
        .add([english]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student21)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student22)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student23)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student24)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student25)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student26)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student27)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student28)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student29)
        .add([spanish]);
      await User.createQueryBuilder()
        .relation(User, 'languages')
        .of(student30)
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
        .add([roleGeneral, roleAdmin]);
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
        .of(student4)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student5)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student6)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student7)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student8)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student9)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student10)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student11)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student12)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student13)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student14)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student15)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student16)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student17)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student18)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student19)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student20)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student21)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student22)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student23)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student24)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student25)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student26)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student27)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student28)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student29)
        .add([roleGeneral, roleStudent]);
      await User.createQueryBuilder()
        .relation(User, 'roles')
        .of(student30)
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
        .of(student4)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student5)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student6)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student7)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student8)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student9)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student10)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student11)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student12)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student13)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student14)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student15)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student16)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student17)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student18)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student19)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student20)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student21)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student22)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student23)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student24)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student25)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student26)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student27)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student28)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student29)
        .add([kitesurf]);
      await User.createQueryBuilder()
        .relation(User, 'sports')
        .of(student30)
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
