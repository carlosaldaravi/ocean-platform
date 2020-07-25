import { IsNumber, IsString } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadLevelDto } from '../../level/dto';

@Exclude()
export class ReadStatsDto {
  @Expose()
  @IsString()
  readonly totalStudents: number;

  @Expose()
  @IsString()
  readonly totalInstructors: number;

  @Expose()
  @IsString()
  readonly totalCourses: number;

  @Expose()
  @IsString()
  readonly totalWon: number;

  // @Expose()
  // @Type(type => ReadLevelDto)
  // readonly level: ReadLevelDto;
}
