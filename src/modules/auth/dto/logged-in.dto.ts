import { IsString } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadUserDto } from '../../../modules/user/dto';

@Exclude()
export class LoggedInDto {
  @Expose()
  @IsString()
  token: string;

  @Expose()
  @Type(() => ReadUserDto)
  user: ReadUserDto;
}
