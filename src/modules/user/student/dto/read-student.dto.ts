import { IsNumber, IsEmail } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../../role/dto';
import { ReadStudentDetailsDto } from './read-student-detail.dto';
import { ReadUserSportDto } from '../../dto/read-user-sport.dto';
import { status } from 'src/shared/entity-status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadStudentDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @Expose()
  @IsEmail()
  @ApiProperty({ type: String, description: 'string' })
  readonly email: string;

  @Expose()
  @IsEmail()
  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE'] })
  readonly status: status;

  @Expose()
  @Type(type => ReadStudentDetailsDto)
  @ApiProperty({
    type: ReadStudentDetailsDto,
    description: 'ReadStudentDetailsDto',
  })
  readonly details: ReadStudentDetailsDto;

  @Expose()
  @Type(type => ReadUserSportDto)
  @ApiProperty({ type: [ReadUserSportDto], description: 'ReadUserSportDto' })
  readonly userSports: ReadUserSportDto[];

  @Expose()
  @Type(type => ReadRoleDto)
  @ApiProperty({ type: [ReadRoleDto], description: 'ReadRoleDto' })
  readonly roles: ReadRoleDto[];
}
