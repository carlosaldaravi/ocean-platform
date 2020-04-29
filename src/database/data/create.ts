import { Logger } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { gender } from '../../shared/user-gender.enum';
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
    if ((await Target.count()) == 0) {
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

    if ((await User.count()) == 0) {
      logger.log(`Adding users...`);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('users')
        .values(users_DB_DATA)
        .execute();

      const generalRole = await Role.findOne({ name: 'GENERAL' });
      const adminRole = await Role.findOne({ name: 'ADMIN' });
      const studentRole = await Role.findOne({ name: 'STUDENT' });
      const instructorRole = await Role.findOne({ name: 'INSTRUCTOR' });
      const spanishLanguage = await Language.findOne({ name: 'Spanish' });
      const englishLanguage = await Language.findOne({ name: 'English' });
      const admin = await User.findOne({ email: 'admin@prueba.com' });
      if (admin) {
        const details = new UserDetails();
        details.firstname = 'Carlos';
        details.lastname = 'Aldaravi Coll';
        details.dateBorn = new Date('1987-06-17');
        details.phone = '653642915';
        admin.details = details;
        admin.roles = [generalRole, adminRole];
        admin.languages = [spanishLanguage];
        admin.save();
      }
      const student1 = await User.findOne({ email: 'student1@prueba.com' });
      if (student1) {
        const details = new UserDetails();
        details.firstname = 'Student 1';
        details.dateBorn = new Date('1992-03-02');
        details.phone = '687787677';
        details.city = 'Madrid';
        details.weight = 88;
        details.footprint = 46;
        details.gender = gender.MALE;
        student1.languages = [spanishLanguage, englishLanguage];
        student1.details = details;
        student1.roles = [generalRole, studentRole];
        student1.save();
      }
      const student2 = await User.findOne({ email: 'student2@prueba.com' });
      if (student2) {
        const details = new UserDetails();
        details.firstname = 'Student 2';
        details.dateBorn = new Date('2000-09-23');
        details.phone = '618725644';
        details.city = 'Albacete';
        details.weight = 53;
        details.footprint = 37;
        details.gender = gender.FEMALE;
        details.knownWay = 'Instagram';
        student2.languages = [spanishLanguage, englishLanguage];
        student2.details = details;
        student2.roles = [generalRole, studentRole];
        student2.save();
      }
      const student3 = await User.findOne({ email: 'student3@prueba.com' });
      if (student3) {
        const details = new UserDetails();
        details.firstname = 'Student 3';
        details.dateBorn = new Date('1982-10-13');
        details.phone = '662512115';
        details.city = 'Alicante';
        details.weight = 80;
        details.footprint = 44;
        details.gender = gender.MALE;
        details.knownWay = 'Internet';
        details.comments = 'Tiene una lesión en el hombro derecho';
        student3.languages = [spanishLanguage];
        student3.details = details;
        student3.roles = [generalRole, studentRole];
        student3.save();
      }
      const instructor1 = await User.findOne({
        email: 'instructor1@prueba.com',
      });
      if (instructor1) {
        const details = new UserDetails();
        details.firstname = 'Instructor 1';
        instructor1.details = details;
        instructor1.languages = [englishLanguage];
        instructor1.roles = [generalRole, instructorRole];
        instructor1.save();
      }
      const instructor2 = await User.findOne({
        email: 'instructor2@prueba.com',
      });
      if (instructor2) {
        const details = new UserDetails();
        details.firstname = 'Instructor 2';
        instructor1.details = details;
        instructor2.languages = [spanishLanguage];
        instructor2.roles = [generalRole, instructorRole];
        instructor2.save();
      }
      const instructor3 = await User.findOne({
        email: 'instructor3@prueba.com',
      });
      if (instructor3) {
        const details = new UserDetails();
        details.firstname = 'Instructor 3';
        instructor1.details = details;
        instructor3.languages = [spanishLanguage, englishLanguage];
        instructor3.roles = [generalRole, instructorRole];
        instructor3.save();
      }
    }
  } catch (error) {
    console.log('Error setting default values', error);
  }
};
