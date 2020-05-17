import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { ReadStudentDto } from './dto/read-student.dto';
import { StudentService } from './student.service';
import { GetUser } from 'src/modules/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/modules/role/guards/role.guard';
import { User } from '../user.entity';
import { CreateStudentDto } from './dto';
import { RoleType } from 'src/modules/role/roletype.enum';
import { Roles } from 'src/modules/role/decorators/role.decoratos';
import { ReadTargetDto } from 'src/modules/target/dto';
import { CreateStudentCalendarDto } from './dto/create-student-calendar.dto';
import { ReadStudentCalendarDto } from './dto/read-student-calendar.dto';

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

  @Get('/courses')
  @Roles(RoleType.STUDENT)
  getCourses(@GetUser() user: User): Promise<any> {
    return this._studentService.getCourses(user);
  }

  @Get('/targets')
  @Roles(RoleType.STUDENT)
  getTargets(@GetUser() user: User): Promise<ReadTargetDto[]> {
    return this._studentService.getTargets(user);
  }

  @Get('/calendar')
  @Roles(RoleType.STUDENT)
  getCalendar(@GetUser() user: User): Promise<ReadTargetDto[]> {
    return this._studentService.getCalendar(user);
  }

  @Post()
  create(
    @Body() createStudentDto: CreateStudentDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this._studentService.createStudent(createStudentDto, user);
  }

  @Post('/calendar')
  createCalendar(
    @Body() createStudentCalendarDto: CreateStudentCalendarDto,
    @GetUser() user: User,
  ): Promise<ReadStudentCalendarDto> {
    return this._studentService.createStudentCalendar(
      createStudentCalendarDto,
      user,
    );
  }
}
