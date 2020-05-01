import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { RoleType } from '../role/roletype.enum';
import { status } from 'src/shared/entity-status.enum';
import { ReadStudentDto } from './student/dto/read-student.dto';
import { plainToClass } from 'class-transformer';
import { ReadUserDto } from './dto';
import { ReadInstructorDto } from './instructor/dto/read-instructor.dto';

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
}
