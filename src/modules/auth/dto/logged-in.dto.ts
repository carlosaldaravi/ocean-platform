import { IsString } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadUserDto } from '../../../modules/user/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class LoggedInDto {
  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'token' })
  token: string;

  @Expose()
  @Type(() => ReadUserDto)
  @ApiProperty({ type: ReadUserDto, description: 'ReadUserDto' })
  user: ReadUserDto;
}
