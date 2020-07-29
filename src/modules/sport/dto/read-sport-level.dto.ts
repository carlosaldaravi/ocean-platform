import { IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { Level } from '../../level/level.entity';
import { Target } from '../../target/target.entity';
import { ReadLevelDto } from 'src/modules/level/dto';
import { ApiProperty } from '@nestjs/swagger';
import { ReadTargetDto } from 'src/modules/target/dto';

@Exclude()
export class ReadSportLevelDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly sportId: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly levelId: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly order: number;

  @Expose()
  @Type(type => ReadLevelDto)
  @ApiProperty({ type: ReadLevelDto, description: 'ReadLevelDto' })
  readonly level: ReadLevelDto;

  @Expose()
  @Type(type => ReadTargetDto)
  @ApiProperty({ type: ReadTargetDto, description: 'ReadTargetDto' })
  readonly targets: ReadTargetDto;
}
