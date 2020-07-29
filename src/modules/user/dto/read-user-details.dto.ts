import { IsString, IsNumber, IsDate } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { gender } from '../../../shared/user-gender.enum';
import { StudentSize } from '../student/student-size.enum';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadUserDetailsDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly dni: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly firstname: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly lastname: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly phone: string;

  @Expose()
  @IsString()
  @ApiProperty({ enum: ['MALE', 'FEMALE'] })
  readonly gender: gender;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly city: string;

  @Expose()
  @IsString()
  @ApiProperty({ enum: ['XS', 'S', 'M', 'L', 'XL'] })
  readonly size: StudentSize;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly weight: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly footprint: number;

  @Expose()
  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  readonly dateBorn: Date;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly knownWay: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly comments: string;
}
