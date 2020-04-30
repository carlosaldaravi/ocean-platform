import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entity-status.enum';
import { ReadUserDto, UpdateUserDto } from './dto';
import { plainToClass } from 'class-transformer';
import { CreateStudentTargetDto } from './student/dto/create-student-target.dto';
import { StudentTarget } from './student/student-target.entity';
import { StudentTargetRepository } from './student/student-target.repository';
import { TargetRepository } from '../target/target.reposity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
    @InjectRepository(StudentTargetRepository)
    private readonly _studentTargetRepository: StudentTargetRepository,
    @InjectRepository(TargetRepository)
    private readonly _targetRepository: TargetRepository,
  ) {}
  async get(userId: number): Promise<ReadUserDto> {
    if (!userId) {
      throw new BadRequestException('Id must be sent');
    }

    const user: User = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToClass(ReadUserDto, user);
  }

  async getAll(): Promise<ReadUserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: status.ACTIVE },
    });

    if (!users) {
      throw new NotFoundException('User not found');
    }

    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  async update(userId: number, user: UpdateUserDto): Promise<ReadUserDto> {
    try {
      const foundUser = await this._userRepository.findOne(userId);

      if (!foundUser) {
        throw new NotFoundException('User does not exists');
      }

      foundUser.email = user.email;
      const updatedUser = await this._userRepository.save(foundUser);

      if (!updatedUser) {
        throw new InternalServerErrorException();
      }
      return plainToClass(ReadUserDto, updatedUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async delete(userId: number): Promise<void> {
    const userExist = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    await this._userRepository.update(userId, { status: status.INACTIVE });
  }

  async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
    const userExist = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    const roleExist = await this._roleRepository.findOne(roleId, {
      where: { status: status.ACTIVE },
    });

    if (!roleExist) {
      throw new NotFoundException('Role does not exist');
    }

    userExist.roles.push(roleExist);
    await this._userRepository.save(userExist);

    return true;
  }

  async setTargetsToUsers(
    createStudentTargetDto: Partial<CreateStudentTargetDto>,
    user: User,
  ): Promise<boolean> {
    try {
      // falta comprobar que el instructor es instructor del alumno
      const { students, targets, feedback } = createStudentTargetDto;
      students.forEach(async student => {
        const foundStudent = await this._userRepository.findOne(student);
        if (!foundStudent) {
          throw new NotFoundException(`Not found user with id ${student}`);
        }
        targets.forEach(async target => {
          const foundTarget = await this._targetRepository.findOne(target);
          if (!foundTarget) {
            throw new NotFoundException(`Not found target with id ${student}`);
          }
          const savedStudentTarget = new StudentTarget();
          savedStudentTarget.student = foundStudent;
          savedStudentTarget.target = foundTarget;
          savedStudentTarget.feedback = feedback;
          savedStudentTarget.validatedBy = 1;
          await this._studentTargetRepository.save(savedStudentTarget);
        });
      });
    } catch (error) {
      throw new Error(error);
    }
    return true;
  }
}
