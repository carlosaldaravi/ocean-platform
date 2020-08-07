import { IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadStatsDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  totalStudents: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  totalInstructors: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  totalCourses: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  totalWon: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  averageStudentYears: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  averageStudentMaleYears: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  averageStudentFemaleYears: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  totalMale: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  totalFemale: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  studentLessYears: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  studentMoreYears: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  totalProfits: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Number' })
  totalCosts: number;
}
