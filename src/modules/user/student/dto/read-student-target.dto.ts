import { IsString, IsDate, IsNumber } from 'class-validator';
import { User } from '../../user.entity';
import { Target } from '../../../target/target.entity';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadUserDto } from '../../dto';
import { ReadTargetDto } from '../../../target/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadStudentTargetDto {
  @Expose()
  @Type(type => ReadUserDto)
  @ApiProperty({ type: ReadUserDto, description: 'ReadUserDto' })
  readonly students: ReadUserDto;

  @Expose()
  @Type(type => ReadTargetDto)
  @ApiProperty({ type: ReadTargetDto, description: 'ReadTargetDto' })
  readonly targets: ReadTargetDto;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  studentId: number;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  feedback: string;

  @Expose()
  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  validatedDate: Date;

  @Expose()
  @IsDate()
  @ApiProperty({ type: Date, description: 'date' })
  date: Date;

  @Expose()
  @Type(type => ReadUserDto)
  @ApiProperty({ type: ReadUserDto, description: 'ReadUserDto' })
  readonly instructor: ReadUserDto;
}
