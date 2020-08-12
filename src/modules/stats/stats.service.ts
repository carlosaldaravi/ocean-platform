import { Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ReadStatsDto } from './dto/read-stats.dto';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import * as moment from 'moment';
import { gender } from 'src/shared/user-gender.enum';

@Injectable()
export class StatsService {
  async get(month: string, year: string): Promise<ReadStatsDto> {
    if (!month || !year) {
      throw new BadRequestException('month and year must be sent');
    }
    console.log('month: ', month);
    console.log('year: ', year);
    let usersYearsOld = [];
    let maleYearsOld = [];
    let femaleYearsOld = [];
    let totalProfits = 0;
    let totalCosts = 0;
    let totalWon = 0;
    let users = await User.createQueryBuilder('user')
      .innerJoinAndSelect('user.details', 'ud')
      .leftJoinAndSelect('user.roles', 'r')
      .leftJoinAndSelect('user.userSports', 'us')
      .leftJoinAndSelect('us.sport', 's')
      .leftJoinAndSelect('user.courseStudents', 'cs')
      .leftJoinAndSelect('cs.course', 'c')
      .leftJoinAndSelect('c.type', 't')
      .leftJoinAndSelect('c.courseInstructors', 'ci')
      .getMany();

    let totalCourses = await Course.createQueryBuilder('course').getCount();
    let totalStudents = users.filter(user =>
      user.roles.some(role => role.name === 'ALUMNO'),
    );

    totalStudents.forEach(student =>
      student.courseStudents.forEach(cs => {
        totalWon += cs.course.type.price;
        //70 * 30 / 100
      }),
    );
    console.log(totalStudents[0].courseStudents[0].course.type);
    console.log(totalStudents[0].courseStudents[0].course.type);

    let totalInstructors = users.filter(user =>
      user.roles.some(role => role.name === 'INSTRUCTOR'),
    );

    let totalMale = totalStudents.filter(
      user => user.details.gender === gender.MALE,
    );

    let totalFemale = totalStudents.filter(
      user => user.details.gender === gender.FEMALE,
    );

    totalStudents.forEach(student => {
      if (student.details.dateBorn) {
        usersYearsOld.push(moment().diff(student.details.dateBorn, 'years'));
      }
    });

    totalMale.forEach(student => {
      if (student.details.dateBorn) {
        maleYearsOld.push(moment().diff(student.details.dateBorn, 'years'));
      }
    });

    totalFemale.forEach(student => {
      if (student.details.dateBorn) {
        femaleYearsOld.push(moment().diff(student.details.dateBorn, 'years'));
      }
    });

    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
    let stats = {
      totalStudents: totalStudents.length,
      totalInstructors: totalInstructors.length,
      totalCourses: totalCourses,
      averageStudentYears: Math.round(average(usersYearsOld)),
      totalMale: totalMale.length,
      totalFemale: totalFemale.length,
      averageStudentMaleYears: Math.round(average(maleYearsOld)),
      averageStudentFemaleYears: Math.round(average(femaleYearsOld)),
      studentLessYears: Math.min(...usersYearsOld),
      studentMoreYears: Math.max(...usersYearsOld),
      totalWon: numberWithCommas(totalWon),
    };

    return plainToClass(ReadStatsDto, stats);
  }
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
