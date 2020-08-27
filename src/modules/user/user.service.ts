import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
  HttpException,
  HttpStatus,
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
import { ReadSportDto } from '../sport/dto';
import { UserSport } from './user-sports.entity';
import { Course } from '../course/course.entity';
import { UserDetails } from './user.details.entity';
import * as fs from 'fs';
import * as im from 'imagemagick';

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

    if (user.details.photo) {
      let userAvatar =
        __dirname + '/../../uploads/imgs/avatar/' + user.details.photo;
    }

    return plainToClass(ReadUserDto, user);
  }

  async getByEmail(email: string): Promise<ReadUserDto> {
    const user: User = await this._userRepository.findOne({ where: { email } });

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

  async updateHimSelf(user: User, updateUser: any): Promise<any> {
    try {
      const foundUser: User = await this._userRepository.findOne({
        where: { email: user.email },
      });

      // Save base64 image to disk
      try {
        // Decoding base-64 image
        function decodeBase64Image(dataString) {
          var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches) {
            var response: any = {};

            if (matches.length !== 3) {
              return new Error('Invalid input string');
            }

            response.type = matches[1];
            response.data = Buffer.from(matches[2], 'base64');

            return response;
          }
        }

        // Regular expression for image type:
        // This regular image extracts the "jpeg" from "image/jpeg"
        var imageTypeRegularExpression = /\/(.*?)$/;

        var base64Data = updateUser.details.photo64;
        delete updateUser.details.photo64;

        var imageBuffer = decodeBase64Image(base64Data);
        let userAvatarLocation = __dirname + '/../../uploads/';
        if (!fs.existsSync(userAvatarLocation)) {
          fs.mkdirSync(userAvatarLocation);
          userAvatarLocation = userAvatarLocation + '/imgs/';
          if (!fs.existsSync(userAvatarLocation)) {
            fs.mkdirSync(userAvatarLocation);
            userAvatarLocation = userAvatarLocation + '/avatar/';
            if (!fs.existsSync(userAvatarLocation)) {
              fs.mkdirSync(userAvatarLocation);
            }
          }
        }
        userAvatarLocation = __dirname + '/../../uploads/imgs/avatar/';

        var avatarName = `avatar_user_${foundUser.id}`;
        // This variable is actually an array which has 5 values,
        // The [1] value is the real image extension
        var imageTypeDetected = imageBuffer.type.match(
          imageTypeRegularExpression,
        );

        console.log('imageTypeDetected: ', imageTypeDetected);

        var userUploadedImagePath =
          userAvatarLocation + avatarName + '.' + imageTypeDetected[1];

        // Save decoded binary image to disk
        try {
          fs.writeFile(userUploadedImagePath, imageBuffer.data, function() {
            console.log(
              'DEBUG - feed:message: Saved to disk image attached by user:',
              userUploadedImagePath,
            );
          });
          updateUser.details.photo = `avatar_user_${foundUser.id}.${imageTypeDetected[1]}`;
        } catch (error) {
          console.log('ERROR:', error);
        }
      } catch (error) {
        console.log('ERROR:', error);
      }

      await this._userRepository
        .createQueryBuilder()
        .update(UserDetails)
        .set(updateUser.details)
        .where('id = :id', { id: foundUser.details.id })
        .execute();

      let userLanguages = [];
      updateUser.languages.forEach(element => {
        if (element.checked) {
          userLanguages.push(element.language);
        }
      });

      const actualLanguagesRelation = await this._userRepository
        .createQueryBuilder()
        .relation(User, 'languages')
        .of(user)
        .loadMany();

      await this._userRepository
        .createQueryBuilder()
        .relation(User, 'languages')
        .of(user)
        .addAndRemove(userLanguages, actualLanguagesRelation);

      const savedUser: User = await this._userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.details', 'details')
        .innerJoinAndSelect('user.roles', 'roles')
        .leftJoinAndSelect('user.userSports', 'uS')
        .leftJoinAndSelect('uS.sport', 'sport')
        .leftJoinAndSelect('uS.level', 'level')
        .leftJoinAndSelect('user.languages', 'languages')
        .where('user.status = :status')
        .andWhere('user.id = :id')
        .setParameters({ status: status.ACTIVE, id: user.id })
        .getOne();
      return savedUser;
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
    let userCourses = await Course.createQueryBuilder('course')
      .innerJoin('course.courseStudents', 'course_students')
      .innerJoin('course.calendar', 'course_calendar')
      .where('course.sport_id = :sportId')
      .andWhere('course_students.student_id = :id')
      .andWhere('course_students.student_id = :id')
      .andWhere('course_calendar.start > :today')
      .setParameters({
        sportId: userSport.sportId,
        id: user.id,
        today: new Date(),
      })
      .getCount();
    let error = true;
    if (userCourses === 0) {
      await this._userRepository
        .createQueryBuilder()
        .delete()
        .from(UserSport)
        .where('user_id = :userId')
        .andWhere('sport_id = :sportId')
        .setParameters({ userId: user.id, sportId: userSport.sportId })
        .execute();
      error = false;
    }
    return {
      error,
    };
  }
}
