import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadSportLevelDto } from './read-sport-level.dto';
import { Target } from '../../target/target.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ReadTargetDto } from 'src/modules/target/dto';

@Exclude()
export class ReadSportDto {
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
  @Type(type => ReadSportLevelDto)
  @ApiProperty({ type: [ReadSportLevelDto], description: 'readSportLevelDto' })
  readonly sportLevels: ReadSportLevelDto[];

  @Expose()
  @Type(type => ReadTargetDto)
  @ApiProperty({ type: ReadTargetDto, description: 'target' })
  readonly target: ReadTargetDto;
}
