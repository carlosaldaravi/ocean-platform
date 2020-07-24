import { IsNumber, IsEmail } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../../role/dto';
import { ReadStudentDetailsDto } from './read-student-detail.dto';
import { ReadUserSportDto } from '../../dto/read-user-sport.dto';
import { status } from 'src/shared/entity-status.enum';

@Exclude()
export class ReadStudentDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsEmail()
  readonly status: status;

  @Expose()
  @Type(type => ReadStudentDetailsDto)
  readonly details: ReadStudentDetailsDto;

  @Expose()
  @Type(type => ReadUserSportDto)
  readonly userSports: ReadUserSportDto[];

  @Expose()
  @Type(type => ReadRoleDto)
  readonly roles: ReadRoleDto[];
}
