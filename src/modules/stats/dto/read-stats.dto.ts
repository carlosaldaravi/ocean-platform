import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadLevelDto } from '../../level/dto';

@Exclude()
export class ReadStatsDto {
  @Expose()
  @IsOptional()
  @IsString()
  totalStudents: number;

  @Expose()
  @IsOptional()
  @IsString()
  totalInstructors: number;

  @Expose()
  @IsOptional()
  @IsString()
  totalCourses: number;

  @Expose()
  @IsOptional()
  @IsString()
  totalWon: number;

  @Expose()
  @IsOptional()
  @IsString()
  averageStudentYears: number;

  @Expose()
  @IsOptional()
  @IsString()
  averageStudentMaleYears: number;

  @Expose()
  @IsOptional()
  @IsString()
  averageStudentFemaleYears: number;

  @Expose()
  @IsOptional()
  @IsString()
  totalMale: number;

  @Expose()
  @IsOptional()
  @IsString()
  totalFemale: number;

  @Expose()
  @IsOptional()
  @IsString()
  studentLessYears: number;

  @Expose()
  @IsOptional()
  @IsString()
  studentMoreYears: number;

  @Expose()
  @IsOptional()
  @IsString()
  totalProfits: number;

  @Expose()
  @IsOptional()
  @IsString()
  totalCosts: number;

  // @Expose()
  // @Type(type => ReadLevelDto)
  // readonly level: ReadLevelDto;
}
