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
    const users = await this._userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.details', 'd')
      .leftJoinAndSelect('u.roles', 'r')
      .where('r.name = :name', { name: RoleType.STUDENT })
      .andWhere('u.status = :status', { status: status.ACTIVE })
      .getMany();

    return users.map((user: User) => plainToClass(ReadStudentDto, user));
  }
}
