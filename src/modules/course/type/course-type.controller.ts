import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ReadCourseTypeDto,
  CreateCourseTypeDto,
  UpdateCourseTypeDto,
} from './dto';
import { CourseTypeService } from './course-type.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../../role/guards/role.guard';
import { RoleType } from '../../role/roletype.enum';
import { Roles } from '../../role/decorators/role.decoratos';

@Controller('course-type')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class CourseTypeController {
  constructor(private readonly _courseTypeService: CourseTypeService) {}

  @Get(':courseTypeId')
  getCourseType(
    @Param('courseTypeId', ParseIntPipe) courseTypeId: number,
  ): Promise<ReadCourseTypeDto> {
    return this._courseTypeService.get(courseTypeId);
  }

  @Get()
  async getCourseTypes(): Promise<ReadCourseTypeDto[]> {
    return this._courseTypeService.getAll();
  }

  @Post()
  @Roles(RoleType.ADMIN)
  createCourseType(
    @Body() courseType: Partial<CreateCourseTypeDto>,
  ): Promise<ReadCourseTypeDto> {
    return this._courseTypeService.create(courseType);
  }

  @Patch(':courseTypeId')
  @Roles(RoleType.ADMIN)
  updateCourseType(
    @Param('courseTypeId', ParseIntPipe) courseTypeId: number,
    @Body() courseType: Partial<UpdateCourseTypeDto>,
  ): Promise<ReadCourseTypeDto> {
    return this._courseTypeService.update(courseTypeId, courseType);
  }

  @Delete(':courseTypeId')
  @Roles(RoleType.ADMIN)
  deleteCourseType(
    @Param('courseTypeId', ParseIntPipe) courseTypeId: number,
  ): Promise<ReadCourseTypeDto> {
    return this._courseTypeService.delete(courseTypeId);
  }
}
