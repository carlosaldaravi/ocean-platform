import { IsNumber, IsEmail, IsString } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../role/dto';
import { ReadUserDto } from '../../../modules/user/dto';
import { Level } from '../../level/level.entity';

@Exclude()
export class ReadTargetDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @Type(type => Level)
  readonly level: Level;

  @Expose()
  @IsString()
  readonly description: string;

  @Expose()
  @Type(type => ReadUserDto)
  readonly students: ReadRoleDto[];
}
