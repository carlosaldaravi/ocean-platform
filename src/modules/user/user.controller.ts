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
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ReadUserDto } from './dto';
import { CreateStudentTargetDto } from './student/dto/create-student-target.dto';
import { RoleType } from '../role/roletype.enum';
import { Roles } from '../role/decorators/role.decoratos';
import { GetUser } from '../auth/user.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { ReadStudentDto } from './student/dto/read-student.dto';
import { ReadStudentTargetDto } from './student/dto/read-student-target.dto';
import { ReadSportDto } from '../sport/dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('sports')
  async getSports(@GetUser() user: User): Promise<ReadSportDto[]> {
    return this._userService.getSports(user);
  }

  @Get(':userId')
  getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto> {
    return this._userService.get(userId);
  }

  @Get()
  async getUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  @Patch(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: User,
  ): Promise<ReadUserDto> {
    return this._userService.update(userId, user);
  }

  @Post('setRole/:userId/:roleId')
  setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<boolean> {
    return this._userService.setRoleToUser(userId, roleId);
  }

  @Post('setTargets')
  @Roles(RoleType.ADMIN, RoleType.INSTRUCTOR)
  setTargetsToUsers(
    @Body() createStudentTargetDto: CreateStudentTargetDto[],
    @GetUser() user: User,
  ): Promise<ReadStudentTargetDto[]> {
    return this._userService.setTargetsToUsers(createStudentTargetDto, user);
  }

  @Delete(':userId')
  @Roles(RoleType.ADMIN)
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this._userService.delete(userId);
  }
}
