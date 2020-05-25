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
import { ReadTargetDto } from '../target/dto';
import { Target } from '../target/target.entity';

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
      .innerJoinAndSelect('sport.sportLevel', 'sportLevel')
      .innerJoinAndSelect('sportLevel.level', 'level')
      .where('uS.user = :id')
      .orderBy('sport.id', 'ASC')
      .addOrderBy('sportLevel.order', 'ASC')
      .setParameter('id', user.id)
      .getMany();

    return sports.map((sport: Sport) => plainToClass(ReadSportDto, sport));
  }
}
