import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from './student.repository';
import { User } from '../user.entity';
import { RoleType } from '../../role/roletype.enum';
import { CreateStudentDto, ReadStudentDto } from './dto';
import { ReadTargetDto } from '../../target/dto';
import { CreateStudentCalendarDto } from './dto/create-student-calendar.dto';
import { ReadStudentCalendarDto } from './dto/read-student-calendar.dto';
import { UserRepository } from '../user.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(StudentRepository)
    private readonly _studentRepository: StudentRepository,
  ) {}
  getAll(): Promise<ReadStudentDto[]> {
    return this._userRepository.findUsersByRole(RoleType.STUDENT);
  }

  getDataToStart() {
    return this._studentRepository.getDataToStart();
  }

  getCourses(user: User): Promise<any> {
    return this._studentRepository.getCourses(user);
  }

  getTargets(user: User): Promise<ReadTargetDto[]> {
    return this._studentRepository.getTargets(user);
  }

  getCalendar(user: User): Promise<ReadTargetDto[]> {
    return this._studentRepository.getCalendar(user);
  }

  createStudent(createStudentDto: CreateStudentDto, user: User): Promise<any> {
    return this._studentRepository.createStudent(createStudentDto, user);
  }

  createStudentCalendar(
    createStudentCalendarDto: CreateStudentCalendarDto,
    user: User,
  ): Promise<ReadStudentCalendarDto> {
    return this._studentRepository.createStudentCalendar(
      createStudentCalendarDto,
      user,
    );
  }
}
