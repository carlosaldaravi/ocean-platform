import { IsString, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentTargetDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  studentId: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  targetId: number;

  @IsString()
  @ApiProperty({ type: String, description: 'string', default: null })
  feedback: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'number', default: null })
  validatedBy: number;

  @IsDate()
  @ApiProperty({ type: Date, description: 'date', default: null })
  validatedDate: Date;
}
