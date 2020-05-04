import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { StudentRepository } from './student.repository';
import { User } from '../user.entity';
import { RoleType } from '../../role/roletype.enum';
import { plainToClass } from 'class-transformer';
import {
  CreateStudentDto,
  ReadStudentDto,
  UpdateStudentDetailsDto,
} from './dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private readonly _studentRepository: StudentRepository,
  ) {}
  getAll(): Promise<ReadStudentDto[]> {
    return this._studentRepository.findUsersByRole(RoleType.STUDENT);
  }

  getDataToStart() {
    return this._studentRepository.getDataToStart();
  }
  createStudent(createStudentDto: CreateStudentDto, user: User): Promise<void> {
    return this._studentRepository.createStudent(createStudentDto, user);
  }
}
