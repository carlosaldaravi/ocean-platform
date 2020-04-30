import { IsNumber, IsEmail } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../../role/dto';
import { ReadInstructorDetailsDto } from './read-instructor-detail.dto';

@Exclude()
export class ReadInstructorDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @Type(type => ReadInstructorDetailsDto)
  readonly details: ReadInstructorDetailsDto;

  @Expose()
  @Type(type => ReadRoleDto)
  readonly roles: ReadRoleDto[];
}
