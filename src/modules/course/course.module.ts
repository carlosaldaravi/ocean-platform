import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from './course.reposity';
import { UserRepository } from '../user/user.repository';
import { CourseTypeController } from './type/course-type.controller';
import { CourseTypeService } from './type/course-type.service';
import { CourseTypeRepository } from './type/course-type.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseRepository,
      UserRepository,
      CourseTypeRepository,
    ]),
  ],
  controllers: [CourseController, CourseTypeController],
  providers: [CourseService, CourseTypeService],
})
export class CourseModule {}
