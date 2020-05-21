import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { RoleType } from '../role/roletype.enum';
import { status } from '../../shared/entity-status.enum';
import { ReadStudentDto } from './student/dto/read-student.dto';
import { plainToClass } from 'class-transformer';
import { ReadUserDto } from './dto';
import { ReadInstructorDto } from './instructor/dto/read-instructor.dto';
import { Sport } from '../sport/sport.entity';
import { ReadSportDto } from '../sport/dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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

  async getSports(user: User): Promise<ReadSportDto[]> {
    const sports = await Sport.createQueryBuilder('sport')
      .innerJoin('sport.userSport', 'uS')
      .innerJoinAndSelect('sport.targets', 'target')
      .innerJoinAndSelect('sport.sportLevel', 'sportLevel')
      .innerJoinAndSelect('sportLevel.level', 'level')
      .innerJoinAndSelect('level.target', 'lT')
      .innerJoinAndSelect('target.studentTargets', 'sT')
      .where('uS.user = :id', { id: user.id })
      .orderBy('sport.id', 'DESC')
      .addOrderBy('sportLevel.order', 'ASC')
      .addOrderBy('lT.id', 'ASC')
      .addOrderBy('target.id', 'ASC')
      .addOrderBy('sT.date', 'DESC')
      .getMany();

    console.log(sports);

    return sports.map((sport: Sport) => plainToClass(ReadSportDto, sport));
  }
}
