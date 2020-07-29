import { IsNumber, IsEmail, IsString } from 'class-validator';
import { ReadUserDetailsDto } from './read-user-details.dto';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../role/dto';
import { status } from '../../../shared/entity-status.enum';
import { ReadUserSportDto } from './read-user-sport.dto';
import { ReadLanguageDto } from '../../language/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @Expose()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  readonly email: string;

  @Expose()
  @Type(type => ReadUserDetailsDto)
  @ApiProperty({ type: ReadUserDetailsDto, description: 'ReadUserDetailsDto' })
  readonly details: ReadUserDetailsDto;

  @Expose()
  @Type(type => ReadRoleDto)
  @ApiProperty({ type: [ReadRoleDto], description: 'ReadRoleDto' })
  readonly roles: ReadRoleDto[];

  @Expose()
  @Type(type => ReadUserSportDto)
  @ApiProperty({ type: [ReadUserSportDto], description: 'ReadUserSportDto' })
  readonly userSports: ReadUserSportDto[];

  @Expose()
  @Type(type => ReadLanguageDto)
  @ApiProperty({ type: [ReadLanguageDto], description: 'ReadLanguageDto' })
  readonly languages: ReadLanguageDto[];

  @Expose()
  @IsString()
  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE'] })
  readonly status: status;
}
