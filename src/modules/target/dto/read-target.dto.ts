import { IsNumber, IsEmail, IsString } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../role/dtos';
import { ReadUserDto } from '../../../modules/user/dto';

@Exclude()
export class ReadTargetDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly level: string;

  @Expose()
  @IsString()
  readonly description: string;

  @Expose()
  @Type(type => ReadUserDto)
  readonly students: ReadRoleDto[];
}
