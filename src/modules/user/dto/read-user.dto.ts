import { IsNumber, IsEmail } from 'class-validator';
import { ReadUserDetailsDto } from './read-user-details.dto';
import { Type } from 'class-transformer';

export class ReadUserDto {
  @IsNumber()
  readonly id: number;

  @IsEmail()
  readonly email: string;

  @Type(type => ReadUserDetailsDto)
  readonly details: ReadUserDetailsDto;
}
