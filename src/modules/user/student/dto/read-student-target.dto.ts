import { IsString, IsDate } from 'class-validator';
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
  @IsString()
  feedback: string;

  @Expose()
  @IsDate()
  date: Date;

  @Expose()
  @Type(type => ReadUserDto)
  readonly validatedBy: User;
}
