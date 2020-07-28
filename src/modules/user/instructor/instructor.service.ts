import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { ReadInstructorDto } from './dto/read-instructor.dto';
import { User } from '../user.entity';
import { RoleType } from '../../role/roletype.enum';
import { InstructorRepository } from './instructor.repository';
import { CreateInstructorDto } from './dto/create-instructor.dto';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(InstructorRepository)
    private readonly _instructorRepository: InstructorRepository,
  ) {}
  getAll(): Promise<ReadInstructorDto[]> {
    return this._userRepository.findUsersByRole(RoleType.INSTRUCTOR);
  }

  getCourses(user: User): Promise<any> {
    return this._instructorRepository.getCourses(user);
  }

  createInstructor(createInstructorDto: CreateInstructorDto): Promise<void> {
    return this._instructorRepository.createInstructor(createInstructorDto);
  }
}
