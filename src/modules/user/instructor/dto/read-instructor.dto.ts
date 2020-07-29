import { IsNumber, IsEmail } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../../role/dto';
import { ReadInstructorDetailsDto } from './read-instructor-detail.dto';
import { status } from 'src/shared/entity-status.enum';
import { ReadSportDto } from 'src/modules/sport/dto';
import { ReadUserSportDto } from '../../dto/read-user-sport.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadInstructorDto {
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
  @Type(type => ReadInstructorDetailsDto)
  @ApiProperty({
    type: ReadInstructorDetailsDto,
    description: 'ReadInstructorDetailsDto',
  })
  readonly details: ReadInstructorDetailsDto;

  @Expose()
  @Type(type => ReadRoleDto)
  @ApiProperty({ type: [ReadRoleDto], description: 'ReadRoleDto' })
  readonly roles: ReadRoleDto[];

  @Expose()
  @Type(type => ReadUserSportDto)
  @ApiProperty({ type: [ReadUserSportDto], description: 'ReadUserSportDto' })
  readonly userSports: ReadUserSportDto[];
}
