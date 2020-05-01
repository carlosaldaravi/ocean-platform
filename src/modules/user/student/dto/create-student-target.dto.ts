import { IsString, IsNumber } from 'class-validator';
import { User } from '../../user.entity';
import { Target } from '../../../target/target.entity';
import { Type } from 'class-transformer';
import { ReadUserDto } from '../../dto';
import { ReadTargetDto } from '../../../target/dto';

export class CreateStudentTargetDto {
  @IsNumber()
  readonly studentId: number;

  @Type(type => ReadTargetDto)
  readonly stargetId: number;

  @IsString()
  feedback: string;

  @IsNumber()
  validatedBy: number;
}
