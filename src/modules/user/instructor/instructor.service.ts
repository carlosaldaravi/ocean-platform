import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { ReadInstructorDto } from './dto/read-instructor.dto';
import { User } from '../user.entity';
import { status } from '../../../shared/entity-status.enum';
import { RoleType } from '../../role/roletype.enum';
import { plainToClass } from 'class-transformer';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}
  getAll(): Promise<ReadInstructorDto[]> {
    return this._userRepository.findUsersByRole(RoleType.INSTRUCTOR);
  }
}
