import { Repository, EntityRepository } from 'typeorm';
import { StudentTarget } from './student-target.entity';
import { User } from '../user.entity';
import { CreateStudentTargetDto } from './dto/create-student-target.dto';
import { plainToClass } from 'class-transformer';
import { ReadStudentTargetDto } from './dto/read-student-target.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { status } from '../../../shared/entity-status.enum';
import { RoleType } from '../../../modules/role/roletype.enum';
import { validate, ValidateBy } from 'class-validator';
import { Target } from 'src/modules/target/target.entity';
import { UserSport } from '../user-sports.entity';
import { SportLevel } from 'src/modules/sport/sport-level.entity';

@EntityRepository(StudentTarget)
export class StudentTargetRepository extends Repository<StudentTarget> {
  async setTargetsToUsers(
    createStudentTargetDto: Partial<CreateStudentTargetDto[]>,
    user: User,
  ): Promise<any> {
    let totalTargetsValidated = 0;

    const validatedBy = await User.createQueryBuilder('u')
      .leftJoinAndSelect('u.details', 'd')
      .leftJoinAndSelect('u.roles', 'r')
      .where('u.status = :status', { status: status.ACTIVE })
      .andWhere('u.id = :userId', { userId: user.id })
      .andWhere('r.name IN (:...name)', {
        name: [RoleType.INSTRUCTOR, RoleType.ADMIN],
      })
      .getOne();
    if (!validatedBy) {
      throw new HttpException(
        'You are not admin or instructor',
        HttpStatus.UNAUTHORIZED,
      );
    }

    createStudentTargetDto.forEach(async element => {
      await StudentTarget.createQueryBuilder()
        .update(StudentTarget)
        .set({
          validatedBy: element.validatedBy,
          validatedDate: element.validatedDate,
          feedback: element.feedback,
        })
        .where('studentId = :studentId')
        .andWhere('targetId = :targetId')
        .setParameters({
          studentId: element.studentId,
          targetId: element.targetId,
        })
        .execute();
      if (element.validatedBy) {
        totalTargetsValidated++;
      }
    });

    //get studenttargets of level changed

    const target = await Target.createQueryBuilder('target')
      .where('target.id = :id')
      .setParameter('id', createStudentTargetDto[0].targetId)
      .getOne();

    const sportId = target.sportId;
    const levelId = target.levelId;

    const totalTargetsSportLevel = await Target.createQueryBuilder('target')
      .where('target.level_id = :levelId')
      .andWhere('target.sport_id = :sportId')
      .setParameters({ levelId, sportId })
      .getCount();

    const updatedStudent = await User.createQueryBuilder('student')
      .innerJoinAndSelect('student.details', 'details')
      .innerJoinAndSelect('student.studentTargets', 'student_targets')
      .innerJoinAndSelect('student_targets.target', 'target')
      .innerJoinAndSelect('target.level', 'level')
      .where('student.id = :studentId')
      .andWhere('level.id = :levelId')
      .setParameters({
        studentId: createStudentTargetDto[0].studentId,
        levelId: target.levelId,
      })
      .getOne();

    if (totalTargetsValidated == totalTargetsSportLevel) {
      let newLevelId = -1;
      const sportLevels = await SportLevel.createQueryBuilder('sl')
        .where('sl.sport_id = :sportId')
        .setParameter('sportId', sportId)
        .orderBy('sl.order', 'DESC')
        .getMany();

      sportLevels.forEach(sl => {
        if (sl.levelId > levelId) {
          newLevelId = sl.levelId;
        }
      });
      if (newLevelId != -1) {
        await UserSport.createQueryBuilder()
          .update(UserSport)
          .set({
            levelId: newLevelId,
          })
          .where('userId = :studentId')
          .andWhere('sportId = :sportId')
          .setParameters({
            studentId: createStudentTargetDto[0].studentId,
            sportId,
          })
          .execute();
      }
    }

    return updatedStudent;
  }
}
