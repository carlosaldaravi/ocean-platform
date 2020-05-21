import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadSportLevelDto } from './read-sport-level.dto';
import { ReadTargetDto } from 'src/modules/target/dto';
import { ReadStudentTargetDto } from 'src/modules/user/student/dto/read-student-target.dto';

@Exclude()
export class ReadSportDto {
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
  @Type(type => ReadSportLevelDto)
  readonly sportLevel: ReadSportLevelDto[];
}
