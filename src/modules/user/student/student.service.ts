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
  getAll(): Promise<ReadStudentDto[]> {
    return this._userRepository.findByRole(RoleType.STUDENT);
  }
}
