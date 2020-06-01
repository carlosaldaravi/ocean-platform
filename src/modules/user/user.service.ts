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
import { UserSport } from './user-sports.entity';
import { Course } from '../course/course.entity';
import { Raw } from 'typeorm';
import { networkInterfaces } from 'os';

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

  async updateHimSelf(user: User, updateUser: UpdateUserDto): Promise<any> {
    try {
      // const foundUser: User = await this._userRepository.findOne({
      //   where: { email: user.email },
      // });
      // foundUser.email = updateUser.email;
      // foundUser.languages = updateUser.languages;
      // foundUser.details = updateUser.details;
      // foundUser.userSports = updateUser.userSports;
      // const updatedUser = await this._userRepository.save(foundUser);

      // if (!updatedUser) {
      //   throw new InternalServerErrorException();
      // }
      console.log(updateUser);

      const actualDetailsRelation = await this._userRepository
        .createQueryBuilder()
        .relation(User, 'languages')
        .of(user)
        .loadMany();

      await this._userRepository
        .createQueryBuilder()
        .relation(User, 'languages')
        .of(user)
        .addAndRemove(updateUser.languages, actualDetailsRelation);

      // console.log(actualDetailsRelation);

      // await this._userRepository
      //   .createQueryBuilder()
      //   .update(User)
      //   .set(updateUser)
      //   .where('email = :email', { email: user.email })
      //   .execute();

      // return plainToClass(ReadUserDto, updatedUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException(error);
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

  async deleteUserSport(userSport: UserSport, user: User) {
    console.log('eliminando deporte');
    console.log(userSport);
    let userCourses = await Course.createQueryBuilder('course')
      .innerJoin('course.courseStudents', 'course_students')
      .innerJoin('course.calendar', 'course_calendar')
      .where('course.sport_id = :sportId')
      .andWhere('course_students.student_id = :id')
      .andWhere('course_students.student_id = :id')
      .andWhere('course_calendar.date > :today')
      .setParameters({
        sportId: userSport.sportId,
        id: user.id,
        today: '2020-06-01',
      })
      .getCount();

    console.log('total: ', userCourses);
    if (userCourses === 0) {
      await this._userRepository
        .createQueryBuilder()
        .delete()
        .from(UserSport)
        .where('user_id = :userId')
        .andWhere('sport_id = :sportId')
        .setParameters({ userId: user.id, sportId: userSport.sportId })
        .execute();
    }
  }
}
