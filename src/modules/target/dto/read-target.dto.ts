import { IsNumber, IsString } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadLevelDto } from '../../level/dto';
import { ReadStudentTargetDto } from '../../user/student/dto/read-student-target.dto';
import { ReadSportDto } from '../../sport/dto';

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
  @Type(type => ReadSportDto)
  readonly sport: ReadSportDto;

  @Expose()
  @Type(type => ReadStudentTargetDto)
  readonly studentTargets: ReadStudentTargetDto[];
}
