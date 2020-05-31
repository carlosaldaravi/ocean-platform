import { IsEmail, IsString } from 'class-validator';
import { status } from '../../../shared/entity-status.enum';
import { Type } from 'class-transformer';
import { Language } from 'src/modules/language/language.entity';
import { UserSport } from '../user-sports.entity';
import { UserDetails } from '../user.details.entity';

export class UpdateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly status: status;

  @Type(type => UserDetails)
  details: UserDetails;

  @Type(type => Language)
  languages: Language[];

  @Type(type => UserSport)
  userSports: UserSport[];
}
