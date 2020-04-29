import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { ReadStudentDto } from './dto/read-student.dto';
import { User } from '../user.entity';
import { status } from '../../../shared/entity-status.enum';
import { RoleType } from '../../role/roletype.enum';
import { plainToClass } from 'class-transformer';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}
  async getAll(): Promise<ReadStudentDto[]> {
    const users: User[] = await this._userRepository.find({
      //   join: { alias: 'user', innerJoin: { roles: 'user.roles' } },
      where: qb => {
        qb.where({
          // Filter Role fields
          status: status.ACTIVE,
        }).andWhere('roles.name = :rolesType', { rolesType: RoleType.STUDENT }); // Filter related field
      },
    });

    return users.map((user: User) => plainToClass(ReadStudentDto, user));
  }
}
