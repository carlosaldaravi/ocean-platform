import { IsNumber, IsEmail, IsString } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../role/dto';
import { ReadUserDto } from '../../../modules/user/dto';
import { Level } from '../../level/level.entity';
import { Sport } from 'src/modules/sport/sport.entity';
import { ReadLevelDto } from 'src/modules/level/dto';
import { ReadStudentTargetDto } from 'src/modules/user/student/dto/read-student-target.dto';

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
  readonly description: string;

  @Expose()
  @Type(type => ReadLevelDto)
  readonly level: ReadLevelDto;

  @Expose()
  @Type(type => ReadStudentTargetDto)
  readonly studentTargets: ReadStudentTargetDto[];
}
