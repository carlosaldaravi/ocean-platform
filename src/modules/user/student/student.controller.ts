import { Controller, Get } from '@nestjs/common';
import { ReadStudentDto } from './dto/read-student.dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly _studentService: StudentService) {}
  @Get()
  getStudents(): Promise<ReadStudentDto[]> {
    return this._studentService.getAll();
  }
}
