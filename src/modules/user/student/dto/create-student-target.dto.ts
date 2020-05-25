import { IsString, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ReadTargetDto } from '../../../target/dto';

export class CreateStudentTargetDto {
  @IsNumber()
  studentId: number;

  @Type(type => ReadTargetDto)
  stargetId: number;

  @IsString()
  feedback: string;

  @IsNumber()
  validatedBy: number;

  @IsDate()
  validatedDate: Date;
}
