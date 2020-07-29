import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Level } from '../../level/level.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTargetDto {
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly name: string;

  @IsString()
  @ApiProperty({ type: Number, description: 'number' })
  readonly level: number;

  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly description: string;
}
