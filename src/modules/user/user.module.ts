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
import { AuthService } from '../auth/auth.service';
import { AuthRepository } from '../auth/auth.repository';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      StudentTargetRepository,
      TargetRepository,
      StudentRepository,
      InstructorRepository,
      AuthRepository,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret:
            process.env.JWT_SECRET || config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: 43765456786,
          },
        };
      },
    }),
    AuthModule,
  ],
  providers: [UserService, StudentService, InstructorService, AuthService],
  controllers: [UserController, StudentController, InstructorController],
})
export class UserModule {}
