import { Repository, EntityRepository } from 'typeorm';
import { StudentTarget } from './student-target.entity';
import { User } from '../user.entity';
import { CreateStudentTargetDto } from './dto/create-student-target.dto';
import { plainToClass } from 'class-transformer';
import { ReadStudentTargetDto } from './dto/read-student-target.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { status } from '../../../shared/entity-status.enum';
import { RoleType } from '../../../modules/role/roletype.enum';

@EntityRepository(StudentTarget)
export class StudentTargetRepository extends Repository<StudentTarget> {
  async setTargetsToUsers(
    createStudentTargetDto: Partial<CreateStudentTargetDto[]>,
    user: User,
  ): Promise<ReadStudentTargetDto> {
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
    createStudentTargetDto.forEach(element => {
      element.validatedBy = validatedBy.id;
    });
    const studentTargets = await StudentTarget.createQueryBuilder()
      .insert()
      .into(StudentTarget)
      .values(createStudentTargetDto)
      .execute();
    return plainToClass(ReadStudentTargetDto, studentTargets);
  }
}
