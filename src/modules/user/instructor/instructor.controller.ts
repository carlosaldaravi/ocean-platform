import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { ReadInstructorDto } from './dto/read-instructor.dto';
import { InstructorService } from './instructor.service';
import { Roles } from 'src/modules/role/decorators/role.decoratos';
import { RoleType } from 'src/modules/role/roletype.enum';
import { GetUser } from 'src/modules/auth/user.decorator';
import { User } from '../user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/modules/role/guards/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateInstructorDto } from './dto/create-instructor.dto';

@Controller('instructors')
@ApiTags('Instructors')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class InstructorController {
  constructor(private readonly _instructorService: InstructorService) {}
  @Get()
  getInstructors(): Promise<ReadInstructorDto[]> {
    return this._instructorService.getAll();
  }
  @Get('/courses')
  @Roles(RoleType.INSTRUCTOR)
  getCourses(@GetUser() user: User): Promise<any> {
    return this._instructorService.getCourses(user);
  }

  @Post()
  @Roles(RoleType.ADMIN)
  createInstructor(
    @Body() createInstructorDto: CreateInstructorDto,
  ): Promise<void> {
    return this._instructorService.createInstructor(createInstructorDto);
  }
}
