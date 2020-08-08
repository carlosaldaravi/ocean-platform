import { IsNumber, IsString } from 'class-validator';
import { Level } from '../../level/level.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTargetDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly name: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly levelId: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly sportId: number;

  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly description: string;
}
