import { Repository, EntityRepository } from 'typeorm';
import { User } from '../user.entity';
import { ReadStudentDto } from './dto/read-student.dto';
import { plainToClass } from 'class-transformer';
import { ReadUserDto } from '../dto';
import { RoleType } from 'src/modules/role/roletype.enum';
import { status } from 'src/shared/entity-status.enum';
import { ReadInstructorDto } from '../instructor/dto/read-instructor.dto';
import { CreateStudentDto } from './dto';
import { Sport } from 'src/modules/sport/sport.entity';
import { Target } from 'src/modules/target/target.entity';
import { Level } from 'src/modules/level/level.entity';

@EntityRepository(User)
export class StudentRepository extends Repository<User> {
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

  async getDataToStart() {
    const sports = await Sport.find({ where: { status: status.ACTIVE } });
    const levels = await Level.find({ where: { status: status.ACTIVE } });

    let data = {
      ok: true,
      message: 'Getting data to register as student',
      data: {
        sports,
        levels,
      },
    };
    return data;
  }

  async createStudent(
    createStudentDto: CreateStudentDto,
    user: User,
  ): Promise<any> {
    const foundUser = await User.findOne(user.id);
    foundUser.details = createStudentDto.details;
    foundUser.sports = createStudentDto.sports;
    foundUser.level = createStudentDto.level;
    foundUser.calendar = createStudentDto.calendar;
    foundUser.save();
    return {
      ok: true,
      message: 'Student created.',
    };
  }
}
