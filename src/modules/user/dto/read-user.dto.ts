import { IsNumber, IsEmail, IsString } from 'class-validator';
import { ReadUserDetailsDto } from './read-user-details.dto';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../role/dto';
import { status } from '../../../shared/entity-status.enum';
import { ReadSportDto } from 'src/modules/sport/dto';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @Type(type => ReadUserDetailsDto)
  readonly details: ReadUserDetailsDto;

  @Expose()
  @Type(type => ReadRoleDto)
  readonly roles: ReadRoleDto[];

  @Expose()
  @Type(type => ReadSportDto)
  readonly sports: ReadSportDto[];

  @Expose()
  @IsString()
  readonly status: status;
}
