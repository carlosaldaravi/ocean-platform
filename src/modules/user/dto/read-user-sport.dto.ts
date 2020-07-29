import { IsNumber } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadSportDto } from '../../sport/dto';
import { ReadLevelDto } from '../../level/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadUserSportDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly userId: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly sportId: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly levelId: number;

  @Expose()
  @Type(type => ReadLevelDto)
  @ApiProperty({ type: ReadLevelDto, description: 'ReadLevelDto' })
  readonly level: ReadLevelDto;

  @Expose()
  @Type(type => ReadSportDto)
  @ApiProperty({ type: ReadSportDto, description: 'ReadSportDto' })
  readonly sport: ReadSportDto;
}
