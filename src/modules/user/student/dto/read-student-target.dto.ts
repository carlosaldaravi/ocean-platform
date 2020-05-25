import { IsString, IsDate, IsNumber } from 'class-validator';
import { User } from '../../user.entity';
import { Target } from '../../../target/target.entity';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadUserDto } from '../../dto';
import { ReadTargetDto } from '../../../target/dto';

@Exclude()
export class ReadStudentTargetDto {
  @Expose()
  @Type(type => ReadUserDto)
  readonly students: User;

  @Expose()
  @Type(type => ReadTargetDto)
  readonly targets: Target;

  @Expose()
  @IsNumber()
  studentId: number;

  @Expose()
  @IsString()
  feedback: string;

  @Expose()
  @IsDate()
  validatedDate: Date;

  @Expose()
  @IsDate()
  date: Date;

  @Expose()
  @Type(type => ReadUserDto)
  readonly instructor: User;
}
