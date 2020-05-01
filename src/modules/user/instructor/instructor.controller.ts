import { Controller, Get } from '@nestjs/common';
import { ReadInstructorDto } from './dto/read-instructor.dto';
import { InstructorService } from './instructor.service';

@Controller('instructors')
export class InstructorController {
  constructor(private readonly _instructorService: InstructorService) {}
  @Get()
  getInstructors(): Promise<ReadInstructorDto[]> {
    return this._instructorService.getAll();
  }
}
