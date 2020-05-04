import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { ReadStudentDto } from './dto/read-student.dto';
import { StudentService } from './student.service';
import { GetUser } from 'src/modules/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/modules/role/guards/role.guard';
import { User } from '../user.entity';
import { CreateStudentDto } from './dto';

@Controller('students')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class StudentController {
  constructor(private readonly _studentService: StudentService) {}
  @Get()
  getStudents(): Promise<ReadStudentDto[]> {
    return this._studentService.getAll();
  }

  @Get('/start')
  getDataToStart() {
    return this._studentService.getDataToStart();
  }

  @Post()
  create(
    @Body() createStudentDto: CreateStudentDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this._studentService.createStudent(createStudentDto, user);
  }
}
