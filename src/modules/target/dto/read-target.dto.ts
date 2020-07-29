import { IsNumber, IsString } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadLevelDto } from '../../level/dto';
import { ReadStudentTargetDto } from '../../user/student/dto/read-student-target.dto';
import { ReadSportDto } from '../../sport/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadTargetDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly name: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly description: string;

  @Expose()
  @Type(type => ReadLevelDto)
  // @ApiProperty({ type: ReadLevelDto, description: 'ReadLevelDto' })
  readonly level: ReadLevelDto;

  @Expose()
  @Type(type => ReadSportDto)
  // @ApiProperty({ type: ReadSportDto, description: 'ReadSportDto' })
  readonly sport: ReadSportDto;

  @Expose()
  @Type(type => ReadStudentTargetDto)
  // @ApiProperty({
  //   type: [ReadStudentTargetDto],
  //   description: 'ReadStudentTargetDto',
  // })
  readonly studentTargets: ReadStudentTargetDto[];
}
