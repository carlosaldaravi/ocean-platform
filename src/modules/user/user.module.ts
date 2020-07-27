import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { RoleRepository } from '../role/role.repository';
import { StudentTargetRepository } from './student/student-target.repository';
import { TargetRepository } from '../target/target.reposity';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { InstructorService } from './instructor/instructor.service';
import { InstructorController } from './instructor/instructor.controller';
import { StudentRepository } from './student/student.repository';
import { InstructorRepository } from './instructor/instructor.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      StudentTargetRepository,
      TargetRepository,
      StudentRepository,
      InstructorRepository,
    ]),
    AuthModule,
  ],
  providers: [UserService, StudentService, InstructorService],
  controllers: [UserController, StudentController, InstructorController],
})
export class UserModule {}
