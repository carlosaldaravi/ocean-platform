import { IsEmail, IsString } from 'class-validator';
import { status } from '../../../shared/entity-status.enum';

export class UpdateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly status: status;
}
