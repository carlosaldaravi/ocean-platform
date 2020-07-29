import { IsNumber } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadSportDto } from '../../sport/dto';
import { ReadLevelDto } from '../../level/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UpdateUserSportDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  userId: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  sportId: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  levelId: number;

  @Type(type => ReadLevelDto)
  @ApiProperty({ type: ReadLevelDto, description: 'ReadLevelDto' })
  level: ReadLevelDto;

  @Type(type => ReadSportDto)
  @ApiProperty({ type: ReadSportDto, description: 'ReadSportDto' })
  sport: ReadSportDto;
}
