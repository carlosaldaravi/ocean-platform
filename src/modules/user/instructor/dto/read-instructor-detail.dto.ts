import { IsString, IsDate } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { gender } from 'src/shared/user-gender.enum';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadInstructorDetailsDto {
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
  readonly dni: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly phone: string;

  @Expose()
  @IsDate()
  @ApiProperty({ type: Date, description: 'Date' })
  readonly dateBorn: Date;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly city: string;

  @Expose()
  @IsString()
  @ApiProperty({ enum: ['MALE', 'FEMALE'] })
  readonly gender: gender;
}
