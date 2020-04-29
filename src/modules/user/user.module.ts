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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      StudentTargetRepository,
      TargetRepository,
    ]),
    AuthModule,
  ],
  providers: [UserService, StudentService],
  controllers: [UserController, StudentController],
})
export class UserModule {}
