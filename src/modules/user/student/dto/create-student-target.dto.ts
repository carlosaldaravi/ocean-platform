import { IsString } from 'class-validator';
import { User } from '../../user.entity';
import { Target } from '../../../target/target.entity';
import { Type } from 'class-transformer';
import { ReadUserDto } from '../../dto';
import { ReadTargetDto } from '../../../target/dto';

export class CreateStudentTargetDto {
  @Type(type => ReadUserDto)
  readonly students: User[];

  @Type(type => ReadTargetDto)
  readonly targets: Target[];

  @IsString()
  feedback: string;

  @Type(type => ReadUserDto)
  readonly validatedBy: User;
}
