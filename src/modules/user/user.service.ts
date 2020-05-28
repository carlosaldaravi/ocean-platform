import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
  HttpException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entity-status.enum';
import { ReadUserDto, UpdateUserDto } from './dto';
import { plainToClass } from 'class-transformer';
import { CreateStudentTargetDto } from './student/dto/create-student-target.dto';
import { StudentTargetRepository } from './student/student-target.repository';
import { TargetRepository } from '../target/target.reposity';
import { Role } from '../role/role.entity';
import { ReadSportDto } from '../sport/dto';

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
    const user: User = await this._userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.details', 'details')
      .innerJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.userSports', 'uS')
      .leftJoinAndSelect('uS.sport', 'sport')
      .leftJoinAndSelect('uS.level', 'level')
      .leftJoinAndSelect('user.languages', 'languages')
      .where('user.status = :status')
      .andWhere('user.id = :id')
      .setParameters({ status: status.ACTIVE, id: userId })
      .getOne();

    if (!user) {
      throw new HttpException('User not found as student', HttpStatus.OK);
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

    await this._userRepository
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(userExist)
      .add(roleExist);

    return true;
  }

  async setTargetsToUsers(
    createStudentTargetDto: Partial<CreateStudentTargetDto[]>,
    user: User,
  ): Promise<any> {
    return this._studentTargetRepository.setTargetsToUsers(
      createStudentTargetDto,
      user,
    );
  }

  getSports(user: User): Promise<ReadSportDto[]> {
    return this._userRepository.getSports(user);
  }
}
